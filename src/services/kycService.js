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
    if (!file) {
      throw new Error('No file selected')
    }

    // =========================
    // Validate type
    // =========================
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error('Only JPG, PNG, WEBP, and PDF files are allowed')
    }

    // =========================
    // Validate size
    // =========================
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size must be less than 5MB')
    }

    const fileExt = file.name.split('.').pop()

    const fileName = `${userId}/${documentType}_${Date.now()}.${fileExt}`

    // fake progress start
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

const { data: uploadData, error: uploadError } = await supabase.storage
  .from('kyc-documents')
  .upload(fileName, file, {
    upsert: true
  })

console.log('UPLOAD DATA:', uploadData)
console.log('UPLOAD ERROR:', uploadError)
console.log('======================')

    if (uploadError) {
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
      .insert([
        {
          user_id: userId,
          document_type: documentType,
          file_path: fileName,
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (dbError) {
      console.error('DB INSERT ERROR:', dbError)

      // rollback upload
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
  console.error('FULL KYC ERROR:', err)
  console.error('MESSAGE:', err.message)
  console.error('DETAILS:', err.details)
  console.error('HINT:', err.hint)
  console.error('CODE:', err.code)
  console.error('======================')

  throw err
}
}

/**
 * Generate signed URL for private bucket
 */
export async function getKycDocumentUrl(filePath, expiresIn = 600) {
  const { data, error } = await supabase.storage
    .from('kyc-documents')
    .createSignedUrl(filePath, expiresIn)

  if (error) {
    throw error
  }

  return data.signedUrl
}