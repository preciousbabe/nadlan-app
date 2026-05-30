// services/kycServices.js

import { supabase } from './supabase'

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf'
]

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

/**
 * Upload KYC document + save DB record
 */
export async function uploadKycDocument({
  userId,
  file,
  documentType,
  onProgress
}) {
  try {
    if (!userId) {
      throw new Error('Missing user ID')
    }

    if (!documentType) {
      throw new Error('Missing document type')
    }

    if (!file) {
      throw new Error('No file selected')
    }

    // =========================
    // Validate file type
    // =========================
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error(
        'Only JPG, PNG, WEBP, and PDF files are allowed'
      )
    }

    // =========================
    // Validate file size
    // =========================
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(
        'File size must be less than 5MB'
      )
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase()

    const fileName =
      `${userId}/${documentType}_${Date.now()}.${fileExt}`

    if (onProgress) {
      onProgress(15)
    }

    // =========================
    // Upload file
    // =========================
    console.log('======================')
    console.log('STARTING FILE UPLOAD')
    console.log('userId:', userId)
    console.log('documentType:', documentType)
    console.log('fileName:', fileName)
    console.log('file:', file)
    console.log('bucket:', 'kyc-documents')
    console.log('======================')

    const { data: uploadData, error: uploadError } =
      await supabase.storage
        .from('kyc-documents')
        .upload(fileName, file, {
          upsert: true
        })

    console.log('UPLOAD DATA:', uploadData)
    console.log('UPLOAD ERROR:', uploadError)

    if (uploadError) {
      console.error('======================')
      console.error('STORAGE ERROR')
      console.error(uploadError)
      console.error('MESSAGE:', uploadError.message)
      console.error('STATUS:', uploadError.statusCode)
      console.error('======================')

      throw uploadError
    }

    if (onProgress) {
      onProgress(70)
    }

    // =========================
    // Save DB record
    // =========================
    const { data, error: dbError } = await supabase
      .from('kyc_documents')
      .upsert(
        {
          user_id: userId,
          document_type: documentType,
          file_path: fileName,
          status: 'pending'
        },
        {
          onConflict: 'user_id,document_type'
        }
      )
      .select()
      .single()

    if (dbError) {
      console.error('======================')
      console.error('DB INSERT ERROR')
      console.error(dbError)
      console.error('======================')

      // rollback uploaded file
      await supabase.storage
        .from('kyc-documents')
        .remove([fileName])

      throw dbError
    }

    if (onProgress) {
      onProgress(100)
    }

    return data
  } catch (err) {
    console.error('======================')
    console.error('FULL KYC ERROR')
    console.error(err)
    console.error('MESSAGE:', err?.message)
    console.error('DETAILS:', err?.details)
    console.error('HINT:', err?.hint)
    console.error('CODE:', err?.code)
    console.error('NAME:', err?.name)
    console.error('======================')

    throw err
  }
}

/**
 * Generate signed URL for private bucket
 */
export async function getKycDocumentUrl(
  filePath,
  expiresIn = 600
) {
  const { data, error } = await supabase.storage
    .from('kyc-documents')
    .createSignedUrl(filePath, expiresIn)

  if (error) {
    console.error('SIGNED URL ERROR:', error)
    throw error
  }

  return data.signedUrl
}