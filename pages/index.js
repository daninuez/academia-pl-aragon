import React, { useState } from 'react';

export default function AcademiaPlAraagon() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentSection, setCurrentSection] = useState('inicio');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [testConfig, setTestConfig] = useState({
    theme: 'todas',
    block: 'todos',
    numQuestions: 10,
    penaliza: false
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
      setCurrentSection('inicio');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setCurrentSection('inicio');
  };

  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          background: '#ffffff',
          border: '1px solid #e5e5e5',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#000000',
              margin: '0 0 8px 0',
              letterSpacing: '-0.5px'
            }}>
              AcademiaPL Aragón
            </h1>
            <p style={{
              fontSize: '14px',
              color: '#666666',
              margin: '0',
              fontWeight: '400'
            }}>
              Preparación de oposiciones
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ marginBottom: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: '#000000',
                marginBottom: '6px'
              }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@email.com"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '14px',
                  border: '1px solid #d0d0d0',
                  borderRadius: '6px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#003366'}
                onBlur={(e) => e.target.style.borderColor = '#d0d0d0'}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: '#000000',
                marginBottom: '6px'
              }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '14px',
                  border: '1px solid #d0d0d0',
                  borderRadius: '6px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#003366'}
                onBlur={(e) => e.target.style.borderColor = '#d0d0d0'}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '11px 16px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#ffffff',
                background: '#003366',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = '#002244'}
              onMouseOut={(e) => e.target.style.background = '#003366'}
            >
              Acceder
            </button>
          </form>

          <div style={{
            borderTop: '1px solid #e5e5e5',
            paddingTop: '24px',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '12px',
              color: '#999999',
              margin: '0',
              lineHeight: '1.6'
            }}>
              Te acompañamos en la preparación de tu futuro
            </p>
            <p style={{
              fontSize: '11px',
              color: '#cccccc',
              margin: '12px 0 0 0'
            }}>
              25 años de experiencia en la policía
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '220px 1fr',
      minHeight: '100vh',
      background: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#000000'
    }}>
      {/* Sidebar */}
      <div style={{
        background: '#f8f8f8',
        borderRight: '1px solid #e5e5e5',
        padding: '24px 0',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ paddingLeft: '20px', marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '15px',
            fontWeight: '700',
            margin: '0',
            color: '#003366',
            letterSpacing: '-0.3px'
          }}>
            AcademiaPL
          </h2>
          <p style={{
            fontSize: '11px',
            color: '#999999',
            margin: '4px 0 0 0',
            fontWeight: '400'
          }}>
            Aragón
          </p>
        </div>

        <nav style={{ flex: 1 }}>
          {[
            { id: 'inicio', label: 'Inicio', icon: '📊' },
            { id: 'temario', label: 'Temario', icon: '📚' },
            { id: 'tests', label: 'Tests', icon: '✏️' },
            { id: 'practicos', label: 'Casos Prácticos', icon: '🔍' },
            { id: 'examenes', label: 'Exámenes Oficiales', icon: '📋' },
            { id: 'contacto', label: 'Contacto', icon: '📧' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentSection(item.id)}
              style={{
                width: '100%',
                padding: '12px 20px',
                border: 'none',
                background: currentSection === item.id ? '#e8f0ff' : 'transparent',
                color: currentSection === item.id ? '#003366' : '#666666',
                fontSize: '13px',
                fontWeight: currentSection === item.id ? '600' : '400',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
                borderLeft: currentSection === item.id ? '3px solid #003366' : '3px solid transparent',
                paddingLeft: currentSection === item.id ? '17px' : '20px'
              }}
              onMouseOver={(e) => {
                if (currentSection !== item.id) {
                  e.target.style.background = '#f5f5f5';
                }
              }}
              onMouseOut={(e) => {
                if (currentSection !== item.id) {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              <span style={{ marginRight: '8px' }}>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid #e5e5e5', paddingLeft: '20px', paddingTop: '16px' }}>
          <button
            onClick={handleLogout}
            style={{
              width: 'calc(100% - 20px)',
              padding: '10px 12px',
              border: '1px solid #d0d0d0',
              background: '#ffffff',
              color: '#666666',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              borderRadius: '6px',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.borderColor = '#999999';
              e.target.style.color = '#000000';
            }}
            onMouseOut={(e) => {
              e.target.style.borderColor = '#d0d0d0';
              e.target.style.color = '#666666';
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '40px', overflowY: 'auto' }}>
        {/* Inicio */}
        {currentSection === 'inicio' && (
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 12px 0' }}>
              Bienvenido a AcademiaPL Aragón
            </h1>
            <p style={{ fontSize: '16px', color: '#666666', margin: '0 0 40px 0', lineHeight: '1.6' }}>
              Te acompañamos en la preparación de tu futuro en la Policía Local de Aragón
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              marginBottom: '40px'
            }}>
              {[
                { title: 'Unificada', price: '19,99€/mes', desc: 'Convocatoria Unificada' },
                { title: 'Unificada + Una', price: '29,99€/mes', desc: 'Con opción municipal' },
                { title: 'Todo incluido', price: '39,99€/mes', desc: 'Todas las oposiciones' }
              ].map((plan, i) => (
                <div key={i} style={{
                  background: '#f8f8f8',
                  border: '1px solid #e5e5e5',
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0' }}>
                    {plan.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#999999', margin: '0 0 16px 0' }}>
                    {plan.desc}
                  </p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#003366', margin: '0' }}>
                    {plan.price}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ background: '#f8f8f8', border: '1px solid #e5e5e5', borderRadius: '12px', padding: '28px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 20px 0' }}>
                Sobre mí
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#003366', margin: '0 0 8px 0' }}>
                    Experiencia
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666666', margin: '0', lineHeight: '1.6' }}>
                    25 años en la Policía Local. Oficial responsable de la Unidad de Tráfico y Seguridad Vial. Formación en Derecho.
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#003366', margin: '0 0 8px 0' }}>
                    Metodología
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666666', margin: '0', lineHeight: '1.6' }}>
                    Temario actualizado, tests interactivos, casos prácticos y exámenes oficiales con soluciones comentadas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Temario */}
        {currentSection === 'temario' && (
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 24px 0' }}>
              Temario
            </h1>
            <p style={{ fontSize: '14px', color: '#999999', margin: '0 0 32px 0' }}>
              Descargas en PDF organizadas por temas y bloques
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px'
            }}>
              {[
                'Administración General del Estado',
                'Derecho Administrativo',
                'Tráfico y Seguridad Vial',
                'Orden Público',
                'Criminalidad',
                'Protección de datos'
              ].map((tema, i) => (
                <div key={i} style={{
                  background: '#f8f8f8',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>{tema}</span>
                  <button style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#003366',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    padding: '0'
                  }}>
                    📥 Descargar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tests */}
        {currentSection === 'tests' && (
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 24px 0' }}>
              Generador de Tests
            </h1>
            <div style={{
              background: '#f8f8f8',
              border: '1px solid #e5e5e5',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '500px'
            }}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#000000',
                  marginBottom: '8px'
                }}>
                  Temática
                </label>
                <select value={testConfig.theme} onChange={(e) => setTestConfig({...testConfig, theme: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '14px',
                    border: '1px solid #d0d0d0',
                    borderRadius: '6px',
                    fontFamily: 'inherit',
                    outline: 'none'
                  }}>
                  <option value="todas">Todas las temáticas</option>
                  <option value="admin">Administración</option>
                  <option value="trafico">Tráfico</option>
                  <option value="derecho">Derecho</option>
                </select>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#000000',
                  marginBottom: '8px'
                }}>
                  Bloque
                </label>
                <select value={testConfig.block} onChange={(e) => setTestConfig({...testConfig, block: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '14px',
                    border: '1px solid #d0d0d0',
                    borderRadius: '6px',
                    fontFamily: 'inherit',
                    outline: 'none'
                  }}>
                  <option value="todos">Todos los bloques</option>
                  <option value="1">Bloque 1</option>
                  <option value="2">Bloque 2</option>
                  <option value="3">Bloque 3</option>
                </select>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#000000',
                  marginBottom: '8px'
                }}>
                  Número de preguntas: {testConfig.numQuestions}
                </label>
                <input type="range" min="5" max="100" value={testConfig.numQuestions}
                  onChange={(e) => setTestConfig({...testConfig, numQuestions: parseInt(e.target.value)})}
                  style={{
                    width: '100%',
                    cursor: 'pointer'
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" checked={testConfig.penaliza} onChange={(e) => setTestConfig({...testConfig, penaliza: e.target.checked})}
                  style={{ marginRight: '10px', width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <label style={{ fontSize: '14px', cursor: 'pointer' }}>
                  ¿Penalizar errores?
                </label>
              </div>

              <button style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#ffffff',
                background: '#003366',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = '#002244'}
              onMouseOut={(e) => e.target.style.background = '#003366'}
              >
                Generar Test
              </button>
            </div>
          </div>
        )}

        {/* Casos Prácticos */}
        {currentSection === 'practicos' && (
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 24px 0' }}>
              Casos Prácticos Resueltos
            </h1>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '16px'
            }}>
              {[
                { id: 1, title: 'Infracción de tráfico con antecedentes', category: 'Tráfico' },
                { id: 2, title: 'Actuación ante incidente público', category: 'Orden Público' },
                { id: 3, title: 'Maltrato animal - intervención', category: 'Criminalidad' }
              ].map((caso) => (
                <div key={caso.id} style={{
                  background: '#f8f8f8',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#003366';
                  e.currentTarget.style.background = '#f0f4f8';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                  e.currentTarget.style.background = '#f8f8f8';
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px 0' }}>
                        {caso.title}
                      </h3>
                      <p style={{ fontSize: '12px', color: '#999999', margin: '0' }}>
                        {caso.category}
                      </p>
                    </div>
                    <span style={{ fontSize: '14px', color: '#003366', fontWeight: '600' }}>
                      →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exámenes Oficiales */}
        {currentSection === 'examenes' && (
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 24px 0' }}>
              Exámenes Oficiales
            </h1>
            <p style={{ fontSize: '14px', color: '#999999', margin: '0 0 32px 0' }}>
              Pruebas de convocatorias anteriores con soluciones comentadas
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px'
            }}>
              {[
                { year: '2023', convocatoria: 'Unificada' },
                { year: '2023', convocatoria: 'Teruel' },
                { year: '2022', convocatoria: 'Zaragoza' },
                { year: '2022', convocatoria: 'Huesca' }
              ].map((exam, i) => (
                <div key={i} style={{
                  background: '#f8f8f8',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  padding: '20px',
                  textAlign: 'center'
                }}>
                  <p style={{ fontSize: '12px', color: '#999999', margin: '0 0 8px 0' }}>
                    Convocatoria
                  </p>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 12px 0' }}>
                    {exam.convocatoria}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666666', margin: '0 0 16px 0' }}>
                    {exam.year}
                  </p>
                  <button style={{
                    background: 'transparent',
                    border: '1px solid #003366',
                    color: '#003366',
                    padding: '8px 16px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#003366';
                    e.target.style.color = '#ffffff';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#003366';
                  }}>
                    Resolver
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contacto */}
        {currentSection === 'contacto' && (
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 24px 0' }}>
              Contacto
            </h1>
            <div style={{
              background: '#f8f8f8',
              border: '1px solid #e5e5e5',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '500px'
            }}>
              <p style={{ fontSize: '14px', color: '#666666', margin: '0 0 24px 0', lineHeight: '1.6' }}>
                ¿Dudas sobre los contenidos? ¿Necesitas aclaraciones? Contacta directamente.
              </p>

              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#000000', margin: '0 0 8px 0' }}>
                  Email
                </h3>
                <p style={{ fontSize: '14px', color: '#003366', margin: '0', wordBreak: 'break-all' }}>
                  info@academiaplaragon.com
                </p>
              </div>

              <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#000000',
                  marginBottom: '8px'
                }}>
                  Tu mensaje
                </label>
                <textarea
                  placeholder="Cuéntanos tu duda..."
                  style={{
                    width: '100%',
                    minHeight: '120px',
                    padding: '12px',
                    fontSize: '14px',
                    border: '1px solid #d0d0d0',
                    borderRadius: '6px',
                    fontFamily: 'inherit',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#003366'}
                  onBlur={(e) => e.target.style.borderColor = '#d0d0d0'}
                />
                <button style={{
                  marginTop: '16px',
                  padding: '11px 24px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#ffffff',
                  background: '#003366',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = '#002244'}
                onMouseOut={(e) => e.target.style.background = '#003366'}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
