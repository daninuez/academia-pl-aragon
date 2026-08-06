import React, { useState } from 'react';
import questionBank from '../data/questions';

// Baraja una copia del array (Fisher-Yates) sin mutar el original.
function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

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

  // Estado del test en curso: null (config) | 'active' (respondiendo) | 'results' (corregido)
  const [quizStage, setQuizStage] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // answers[i] = índice de la opción elegida, o null si sin responder.
  const [answers, setAnswers] = useState([]);

  const generateTest = () => {
    let pool = questionBank;
    if (testConfig.theme !== 'todas') {
      pool = pool.filter((q) => q.theme === testConfig.theme);
    }
    if (testConfig.block !== 'todos') {
      pool = pool.filter((q) => q.block === testConfig.block);
    }
    const selected = shuffle(pool).slice(0, testConfig.numQuestions);
    setQuizQuestions(selected);
    setAnswers(new Array(selected.length).fill(null));
    setCurrentQuestion(0);
    setQuizStage(selected.length > 0 ? 'active' : 'empty');
  };

  const selectAnswer = (optionIndex) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQuestion] = optionIndex;
      return next;
    });
  };

  const finishQuiz = () => setQuizStage('results');

  const resetQuiz = () => {
    setQuizStage(null);
    setQuizQuestions([]);
    setAnswers([]);
    setCurrentQuestion(0);
  };

  // Corrección: aciertos, fallos, en blanco y nota (con penalización opcional 1/3).
  const getResults = () => {
    let correct = 0;
    let wrong = 0;
    let blank = 0;
    quizQuestions.forEach((q, i) => {
      if (answers[i] === null || answers[i] === undefined) blank += 1;
      else if (answers[i] === q.answer) correct += 1;
      else wrong += 1;
    });
    const total = quizQuestions.length;
    const rawScore = testConfig.penaliza ? correct - wrong / 3 : correct;
    const netScore = Math.max(0, rawScore);
    const grade = total > 0 ? (netScore / total) * 10 : 0;
    return { correct, wrong, blank, total, grade };
  };

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
            {/* --- Configuración del test --- */}
            {(quizStage === null || quizStage === 'empty') && (
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
                    <input type="range" min="5" max="20" value={testConfig.numQuestions}
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
                      ¿Penalizar errores? (cada 3 fallos restan 1 acierto)
                    </label>
                  </div>

                  <button
                    onClick={generateTest}
                    style={{
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

                  {quizStage === 'empty' && (
                    <p style={{ fontSize: '13px', color: '#b00020', margin: '16px 0 0 0' }}>
                      No hay preguntas disponibles con esa combinación de temática y bloque. Prueba otra selección.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* --- Test en curso --- */}
            {quizStage === 'active' && (() => {
              const q = quizQuestions[currentQuestion];
              const selected = answers[currentQuestion];
              const answeredCount = answers.filter((a) => a !== null && a !== undefined).length;
              const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
              return (
                <div style={{ maxWidth: '720px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h1 style={{ fontSize: '22px', fontWeight: '700', margin: '0' }}>
                      Pregunta {currentQuestion + 1} de {quizQuestions.length}
                    </h1>
                    <button
                      onClick={resetQuiz}
                      style={{
                        background: 'transparent',
                        border: '1px solid #d0d0d0',
                        color: '#666666',
                        fontSize: '12px',
                        fontWeight: '500',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      Abandonar
                    </button>
                  </div>

                  <div style={{ height: '6px', background: '#e5e5e5', borderRadius: '3px', marginBottom: '28px', overflow: 'hidden' }}>
                    <div style={{ width: progress + '%', height: '100%', background: '#003366', transition: 'width 0.3s' }} />
                  </div>

                  <p style={{ fontSize: '17px', fontWeight: '600', lineHeight: '1.5', margin: '0 0 24px 0' }}>
                    {q.question}
                  </p>

                  <div style={{ display: 'grid', gap: '12px', marginBottom: '32px' }}>
                    {q.options.map((opt, i) => {
                      const isSelected = selected === i;
                      return (
                        <button
                          key={i}
                          onClick={() => selectAnswer(i)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            width: '100%',
                            textAlign: 'left',
                            padding: '14px 16px',
                            fontSize: '14px',
                            border: isSelected ? '2px solid #003366' : '1px solid #d0d0d0',
                            background: isSelected ? '#e8f0ff' : '#ffffff',
                            color: '#000000',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            transition: 'all 0.15s'
                          }}
                        >
                          <span style={{
                            flexShrink: 0,
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            border: isSelected ? '2px solid #003366' : '1px solid #b0b0b0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: '700',
                            color: isSelected ? '#003366' : '#999999'
                          }}>
                            {String.fromCharCode(65 + i)}
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      onClick={() => setCurrentQuestion((c) => Math.max(0, c - 1))}
                      disabled={currentQuestion === 0}
                      style={{
                        padding: '10px 20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        border: '1px solid #d0d0d0',
                        background: '#ffffff',
                        color: currentQuestion === 0 ? '#cccccc' : '#666666',
                        borderRadius: '6px',
                        cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      Anterior
                    </button>

                    <span style={{ fontSize: '12px', color: '#999999' }}>
                      {answeredCount} de {quizQuestions.length} respondidas
                    </span>

                    {currentQuestion < quizQuestions.length - 1 ? (
                      <button
                        onClick={() => setCurrentQuestion((c) => Math.min(quizQuestions.length - 1, c + 1))}
                        style={{
                          padding: '10px 20px',
                          fontSize: '14px',
                          fontWeight: '600',
                          border: 'none',
                          background: '#003366',
                          color: '#ffffff',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        Siguiente
                      </button>
                    ) : (
                      <button
                        onClick={finishQuiz}
                        style={{
                          padding: '10px 20px',
                          fontSize: '14px',
                          fontWeight: '600',
                          border: 'none',
                          background: '#0a7d38',
                          color: '#ffffff',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        Finalizar y corregir
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* --- Resultados y revisión --- */}
            {quizStage === 'results' && (() => {
              const { correct, wrong, blank, total, grade } = getResults();
              const passed = grade >= 5;
              return (
                <div style={{ maxWidth: '720px' }}>
                  <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 24px 0' }}>
                    Resultado del test
                  </h1>

                  <div style={{
                    background: passed ? '#eef7f0' : '#fbeeee',
                    border: '1px solid ' + (passed ? '#bfe3c9' : '#f0c9c9'),
                    borderRadius: '12px',
                    padding: '28px',
                    marginBottom: '24px',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '13px', color: '#666666', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Nota
                    </p>
                    <p style={{ fontSize: '48px', fontWeight: '700', margin: '0', color: passed ? '#0a7d38' : '#b00020' }}>
                      {grade.toFixed(2)}
                    </p>
                    <p style={{ fontSize: '14px', fontWeight: '600', margin: '8px 0 0 0', color: passed ? '#0a7d38' : '#b00020' }}>
                      {passed ? 'Aprobado' : 'No superado'}
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
                    {[
                      { label: 'Aciertos', value: correct, color: '#0a7d38' },
                      { label: 'Fallos', value: wrong, color: '#b00020' },
                      { label: 'En blanco', value: blank, color: '#999999' }
                    ].map((s) => (
                      <div key={s.label} style={{ background: '#f8f8f8', border: '1px solid #e5e5e5', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                        <p style={{ fontSize: '28px', fontWeight: '700', margin: '0', color: s.color }}>{s.value}</p>
                        <p style={{ fontSize: '12px', color: '#666666', margin: '4px 0 0 0' }}>{s.label} de {total}</p>
                      </div>
                    ))}
                  </div>

                  <h2 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>Revisión</h2>
                  <div style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
                    {quizQuestions.map((q, i) => {
                      const userAnswer = answers[i];
                      const isCorrect = userAnswer === q.answer;
                      const isBlank = userAnswer === null || userAnswer === undefined;
                      return (
                        <div key={q.id} style={{
                          background: '#ffffff',
                          border: '1px solid #e5e5e5',
                          borderLeft: '4px solid ' + (isBlank ? '#cccccc' : isCorrect ? '#0a7d38' : '#b00020'),
                          borderRadius: '8px',
                          padding: '16px 20px'
                        }}>
                          <p style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 12px 0', lineHeight: '1.5' }}>
                            {i + 1}. {q.question}
                          </p>
                          {q.options.map((opt, oi) => {
                            const isRight = oi === q.answer;
                            const isChosen = oi === userAnswer;
                            let bg = 'transparent';
                            let col = '#666666';
                            if (isRight) { bg = '#eef7f0'; col = '#0a7d38'; }
                            else if (isChosen && !isCorrect) { bg = '#fbeeee'; col = '#b00020'; }
                            return (
                              <p key={oi} style={{
                                fontSize: '13px',
                                margin: '0 0 4px 0',
                                padding: '6px 10px',
                                borderRadius: '4px',
                                background: bg,
                                color: col,
                                fontWeight: isRight || isChosen ? '600' : '400'
                              }}>
                                {String.fromCharCode(65 + oi)}. {opt}
                                {isRight ? '  ✓ Correcta' : isChosen ? '  ✗ Tu respuesta' : ''}
                              </p>
                            );
                          })}
                          {isBlank && (
                            <p style={{ fontSize: '12px', color: '#999999', margin: '8px 0 0 0', fontStyle: 'italic' }}>
                              No respondida
                            </p>
                          )}
                          <p style={{ fontSize: '13px', color: '#444444', margin: '10px 0 0 0', lineHeight: '1.5', background: '#f8f8f8', padding: '10px 12px', borderRadius: '6px' }}>
                            <strong>Explicación: </strong>{q.explanation}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      onClick={generateTest}
                      style={{
                        padding: '12px 20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        border: 'none',
                        background: '#003366',
                        color: '#ffffff',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      Repetir con nuevas preguntas
                    </button>
                    <button
                      onClick={resetQuiz}
                      style={{
                        padding: '12px 20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        border: '1px solid #d0d0d0',
                        background: '#ffffff',
                        color: '#666666',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      Configurar otro test
                    </button>
                  </div>
                </div>
              );
            })()}
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
