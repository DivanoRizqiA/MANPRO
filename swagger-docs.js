/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Registrasi user baru
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       200:
 *         description: Registrasi berhasil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Validasi gagal atau email sudah terdaftar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Email atau password salah
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request reset password
 *     description: Mengirim email dengan link reset password ke email user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *     responses:
 *       200:
 *         description: Email reset password terkirim (jika email terdaftar)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Jika email terdaftar, link reset password telah dikirim
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password dengan token
 *     description: Mengubah password menggunakan token yang dikirim via email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       200:
 *         description: Password berhasil direset
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Password berhasil direset
 *       400:
 *         description: Token tidak valid atau expired
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data profil user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Unauthorized - Token tidak valid
 *       404:
 *         description: User tidak ditemukan
 *   put:
 *     summary: Update user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileRequest'
 *     responses:
 *       200:
 *         description: Profil berhasil diupdate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Profil berhasil diperbarui
 *                 user:
 *                   $ref: '#/components/schemas/UserProfile'
 *       400:
 *         description: Validasi gagal
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/auth/change-password:
 *   post:
 *     summary: Ganti password
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordRequest'
 *     responses:
 *       200:
 *         description: Password berhasil diubah
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Password berhasil diubah
 *       400:
 *         description: Password lama tidak sesuai
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/checks:
 *   get:
 *     summary: Get semua riwayat pengecekan
 *     tags: [Diabetes Check]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar riwayat pengecekan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CheckHistory'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *   post:
 *     summary: Tambah pengecekan diabetes baru
 *     description: Melakukan pengecekan risiko diabetes dengan ML prediction dan AI analysis
 *     tags: [Diabetes Check]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DiabetesCheckRequest'
 *     responses:
 *       201:
 *         description: Pengecekan berhasil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DiabetesCheckResponse'
 *       400:
 *         description: Validasi gagal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Hapus semua riwayat pengecekan
 *     tags: [Diabetes Check]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Semua riwayat berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Semua riwayat berhasil dihapus
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/checks/{id}:
 *   delete:
 *     summary: Hapus riwayat pengecekan berdasarkan ID
 *     tags: [Diabetes Check]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID pengecekan yang akan dihapus
 *     responses:
 *       200:
 *         description: Riwayat berhasil dihapus
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Riwayat tidak ditemukan
 */

/**
 * @swagger
 * /api/analysis:
 *   post:
 *     summary: Analisis kesehatan dengan AI
 *     description: Mendapatkan analisis AI berdasarkan data kesehatan diabetes
 *     tags: [Analysis]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnalysisRequest'
 *     responses:
 *       200:
 *         description: Analisis berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     riskPercentage:
 *                       type: number
 *                       example: 75.5
 *                     riskLevel:
 *                       type: string
 *                       example: Tinggi
 *                     analysis:
 *                       type: string
 *                       example: Berdasarkan data kesehatan Anda...
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Cek status server
 *     responses:
 *       200:
 *         description: Server berjalan normal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Server is running
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */

// File ini berisi dokumentasi Swagger untuk semua endpoint
module.exports = {};
