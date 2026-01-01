const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DiaTeksi API',
      version: '1.0.0',
      description: 'API untuk aplikasi pengecekan risiko diabetes DiaTeksi',
      contact: {
        name: 'DiaTeksi Team',
        email: 'support@diateksi.local'
      }
    },
    servers: [
      {
        url: 'http://localhost:7000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Masukkan token JWT yang didapat dari login'
        }
      },
      schemas: {
        // Auth Schemas
        RegisterRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'user@example.com'
            },
            password: {
              type: 'string',
              minLength: 6,
              example: 'password123'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'user@example.com'
            },
            password: {
              type: 'string',
              example: 'password123'
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            },
            message: {
              type: 'string',
              example: 'Login berhasil'
            }
          }
        },
        ForgotPasswordRequest: {
          type: 'object',
          required: ['email'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'user@example.com'
            }
          }
        },
        ResetPasswordRequest: {
          type: 'object',
          required: ['token', 'password'],
          properties: {
            token: {
              type: 'string',
              example: 'abc123resettoken'
            },
            password: {
              type: 'string',
              minLength: 6,
              example: 'newpassword123'
            }
          }
        },
        // User/Profile Schemas
        UserProfile: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011'
            },
            email: {
              type: 'string',
              example: 'user@example.com'
            },
            name: {
              type: 'string',
              example: 'John Doe'
            }
          }
        },
        UpdateProfileRequest: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'newemail@example.com'
            }
          }
        },
        ChangePasswordRequest: {
          type: 'object',
          required: ['oldPassword', 'newPassword'],
          properties: {
            oldPassword: {
              type: 'string',
              example: 'oldpassword123'
            },
            newPassword: {
              type: 'string',
              minLength: 6,
              example: 'newpassword123'
            }
          }
        },
        // Diabetes Check Schemas
        DiabetesCheckRequest: {
          type: 'object',
          required: ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'Height', 'Weight', 'DiabetesPedigreeFunction', 'Age'],
          properties: {
            Pregnancies: {
              type: 'integer',
              minimum: 0,
              maximum: 20,
              example: 2,
              description: 'Jumlah kehamilan'
            },
            Glucose: {
              type: 'number',
              minimum: 0,
              maximum: 500,
              example: 120,
              description: 'Kadar glukosa plasma (mg/dL)'
            },
            BloodPressure: {
              type: 'number',
              minimum: 0,
              maximum: 300,
              example: 80,
              description: 'Tekanan darah diastolik (mmHg)'
            },
            SkinThickness: {
              type: 'number',
              minimum: 0,
              maximum: 100,
              example: 20,
              description: 'Ketebalan lipatan kulit trisep (mm)'
            },
            Insulin: {
              type: 'number',
              minimum: 0,
              maximum: 1000,
              example: 79,
              description: 'Insulin serum 2 jam (mu U/ml)'
            },
            Height: {
              type: 'number',
              minimum: 50,
              maximum: 300,
              example: 170,
              description: 'Tinggi badan (cm)'
            },
            Weight: {
              type: 'number',
              minimum: 10,
              maximum: 500,
              example: 65,
              description: 'Berat badan (kg)'
            },
            DiabetesPedigreeFunction: {
              type: 'number',
              minimum: 0,
              maximum: 3,
              example: 0.5,
              description: 'Fungsi silsilah diabetes'
            },
            Age: {
              type: 'integer',
              minimum: 1,
              maximum: 120,
              example: 30,
              description: 'Usia (tahun)'
            }
          }
        },
        DiabetesCheckResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  example: '507f1f77bcf86cd799439011'
                },
                prediction: {
                  type: 'integer',
                  example: 1,
                  description: '0 = Negatif, 1 = Positif'
                },
                riskPercentage: {
                  type: 'number',
                  example: 75.5
                },
                riskCategory: {
                  type: 'string',
                  enum: ['low', 'medium', 'high'],
                  example: 'high'
                },
                aiAnalysis: {
                  type: 'string',
                  example: 'Berdasarkan data Anda...'
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time'
                }
              }
            }
          }
        },
        CheckHistory: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: {
                type: 'string'
              },
              Glucose: {
                type: 'number'
              },
              BloodPressure: {
                type: 'number'
              },
              BMI: {
                type: 'number'
              },
              prediction: {
                type: 'integer'
              },
              riskPercentage: {
                type: 'number'
              },
              riskCategory: {
                type: 'string'
              },
              createdAt: {
                type: 'string',
                format: 'date-time'
              }
            }
          }
        },
        // Analysis Schema
        AnalysisRequest: {
          type: 'object',
          properties: {
            prediction: {
              type: 'integer',
              enum: [0, 1],
              example: 1
            },
            risk_percentage: {
              type: 'number',
              example: 75.5
            },
            Glucose: {
              type: 'number',
              example: 120
            },
            BloodPressure: {
              type: 'number',
              example: 80
            },
            BMI: {
              type: 'number',
              example: 25.5
            },
            Age: {
              type: 'integer',
              example: 30
            }
          }
        },
        // Error Response
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Error message here'
            }
          }
        },
        ValidationError: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Validasi gagal'
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string',
                    example: 'email'
                  },
                  message: {
                    type: 'string',
                    example: 'Format email tidak valid'
                  }
                }
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Authentication',
        description: 'Endpoint untuk registrasi, login, dan manajemen password'
      },
      {
        name: 'Profile',
        description: 'Endpoint untuk manajemen profil user'
      },
      {
        name: 'Diabetes Check',
        description: 'Endpoint untuk pengecekan risiko diabetes'
      },
      {
        name: 'Analysis',
        description: 'Endpoint untuk analisis AI'
      }
    ]
  },
  apis: ['./api/routes/*.js', './swagger-docs.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
