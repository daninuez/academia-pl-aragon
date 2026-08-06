// Banco de preguntas para la preparación de Policía Local de Aragón.
// theme: 'admin' | 'trafico' | 'derecho'
// block: '1' | '2' | '3'
// answer: índice (0-based) de la opción correcta.

const questions = [
  // ----------------------- ADMINISTRACIÓN (admin) -----------------------
  {
    id: 1,
    theme: 'admin',
    block: '1',
    question: 'Según la Constitución Española de 1978, ¿cuál es la forma política del Estado español?',
    options: [
      'República parlamentaria',
      'Monarquía parlamentaria',
      'Monarquía absoluta',
      'República federal',
    ],
    answer: 1,
    explanation:
      'El artículo 1.3 de la Constitución establece que la forma política del Estado español es la Monarquía parlamentaria.',
  },
  {
    id: 2,
    theme: 'admin',
    block: '1',
    question: '¿En cuántos títulos se estructura la Constitución Española (además del Título Preliminar)?',
    options: ['Diez títulos', 'Ocho títulos', 'Doce títulos', 'Seis títulos'],
    answer: 0,
    explanation:
      'La Constitución consta de un Título Preliminar y diez títulos numerados (del I al X).',
  },
  {
    id: 3,
    theme: 'admin',
    block: '1',
    question: 'El plazo general para interponer un recurso de alzada contra un acto administrativo es de:',
    options: ['Quince días', 'Un mes', 'Tres meses', 'Diez días'],
    answer: 1,
    explanation:
      'La Ley 39/2015 fija en un mes el plazo para interponer el recurso de alzada si el acto es expreso.',
  },
  {
    id: 4,
    theme: 'admin',
    block: '2',
    question: 'La potestad reglamentaria del Gobierno corresponde a:',
    options: [
      'Las Cortes Generales',
      'El Consejo General del Poder Judicial',
      'El Gobierno (Consejo de Ministros)',
      'El Tribunal Constitucional',
    ],
    answer: 2,
    explanation:
      'El artículo 97 CE atribuye al Gobierno el ejercicio de la potestad reglamentaria de acuerdo con la Constitución y las leyes.',
  },
  {
    id: 5,
    theme: 'admin',
    block: '2',
    question: 'El Estatuto de Autonomía de Aragón vigente fue aprobado en el año:',
    options: ['1982', '2007', '1996', '2011'],
    answer: 1,
    explanation:
      'El Estatuto de Autonomía de Aragón actualmente vigente fue aprobado por la Ley Orgánica 5/2007, de 20 de abril.',
  },
  {
    id: 6,
    theme: 'admin',
    block: '3',
    question: 'El silencio administrativo en los procedimientos iniciados a solicitud del interesado, con carácter general, es:',
    options: [
      'Siempre negativo',
      'Siempre positivo',
      'Positivo, salvo excepciones previstas por ley',
      'Inexistente',
    ],
    answer: 2,
    explanation:
      'Con carácter general el silencio es positivo (estimatorio), salvo las excepciones que establezca una norma con rango de ley o de Derecho de la UE.',
  },

  // ----------------------- TRÁFICO (trafico) -----------------------
  {
    id: 7,
    theme: 'trafico',
    block: '1',
    question: 'La tasa de alcohol en aire espirado general para conductores es de:',
    options: [
      '0,15 mg/l',
      '0,25 mg/l',
      '0,30 mg/l',
      '0,50 mg/l',
    ],
    answer: 1,
    explanation:
      'La tasa general es de 0,25 mg/l en aire espirado (0,5 g/l en sangre). Para noveles y profesionales es 0,15 mg/l.',
  },
  {
    id: 8,
    theme: 'trafico',
    block: '1',
    question: 'La velocidad máxima genérica en vías urbanas con un único carril por sentido es de:',
    options: ['20 km/h', '30 km/h', '40 km/h', '50 km/h'],
    answer: 1,
    explanation:
      'Desde 2021, en vías urbanas de un solo carril por sentido de circulación el límite genérico es de 30 km/h.',
  },
  {
    id: 9,
    theme: 'trafico',
    block: '2',
    question: '¿Cuántos puntos tiene inicialmente el permiso de conducción de un conductor con más de 3 años de antigüedad y sin sanciones?',
    options: ['8 puntos', '12 puntos', '15 puntos', '10 puntos'],
    answer: 2,
    explanation:
      'El saldo puede llegar hasta 15 puntos para quienes lleven 3 años sin perder puntos. El saldo inicial es de 12.',
  },
  {
    id: 10,
    theme: 'trafico',
    block: '2',
    question: 'El uso del teléfono móvil sosteniéndolo con la mano mientras se conduce supone la pérdida de:',
    options: ['3 puntos', '4 puntos', '6 puntos', '2 puntos'],
    answer: 2,
    explanation:
      'Desde 2022, sujetar con la mano el teléfono móvil mientras se conduce conlleva la detracción de 6 puntos.',
  },
  {
    id: 11,
    theme: 'trafico',
    block: '3',
    question: 'La distancia mínima lateral que debe dejar un turismo al adelantar a un ciclista es de:',
    options: ['1 metro', '1,5 metros', '2 metros', '0,5 metros'],
    answer: 1,
    explanation:
      'El Reglamento General de Circulación exige dejar al menos 1,5 metros de separación lateral al adelantar a ciclistas.',
  },

  // ----------------------- DERECHO (derecho) -----------------------
  {
    id: 12,
    theme: 'derecho',
    block: '1',
    question: 'El derecho a la tutela judicial efectiva se recoge en el artículo de la Constitución:',
    options: ['Artículo 24', 'Artículo 14', 'Artículo 18', 'Artículo 27'],
    answer: 0,
    explanation:
      'El artículo 24 CE reconoce el derecho a la tutela judicial efectiva de jueces y tribunales.',
  },
  {
    id: 13,
    theme: 'derecho',
    block: '1',
    question: 'La detención preventiva no podrá durar más del tiempo estrictamente necesario y, como máximo, de:',
    options: ['24 horas', '48 horas', '72 horas', '96 horas'],
    answer: 2,
    explanation:
      'El artículo 17.2 CE establece un máximo de 72 horas, tras las cuales el detenido debe ser puesto en libertad o a disposición judicial.',
  },
  {
    id: 14,
    theme: 'derecho',
    block: '2',
    question: 'Según el Código Penal, el hurto se diferencia del robo fundamentalmente en:',
    options: [
      'La cuantía de lo sustraído',
      'El empleo de fuerza en las cosas o violencia/intimidación en las personas',
      'El lugar donde se comete',
      'La edad del autor',
    ],
    answer: 1,
    explanation:
      'El robo requiere fuerza en las cosas o violencia o intimidación en las personas; el hurto se comete sin esos elementos.',
  },
  {
    id: 15,
    theme: 'derecho',
    block: '2',
    question: 'Las Fuerzas y Cuerpos de Seguridad se rigen principalmente por la Ley Orgánica:',
    options: ['2/1986', '4/2015', '1/1992', '3/2018'],
    answer: 0,
    explanation:
      'La Ley Orgánica 2/1986, de 13 de marzo, de Fuerzas y Cuerpos de Seguridad, es la norma básica reguladora.',
  },
  {
    id: 16,
    theme: 'derecho',
    block: '3',
    question: 'La Ley Orgánica de Protección de la Seguridad Ciudadana vigente es la:',
    options: ['LO 1/1992', 'LO 4/2015', 'LO 2/1986', 'LO 3/2018'],
    answer: 1,
    explanation:
      'La Ley Orgánica 4/2015, de 30 de marzo, de protección de la seguridad ciudadana, sustituyó a la anterior LO 1/1992.',
  },
  {
    id: 17,
    theme: 'derecho',
    block: '3',
    question: 'El principio de proporcionalidad en la actuación policial implica:',
    options: [
      'Usar siempre el máximo nivel de fuerza disponible',
      'Adecuar los medios empleados a la gravedad de la situación',
      'Actuar únicamente cuando lo ordene un juez',
      'No intervenir en conflictos privados',
    ],
    answer: 1,
    explanation:
      'La proporcionalidad exige congruencia y oportunidad entre los medios utilizados y el fin perseguido, empleando la fuerza mínima necesaria.',
  },
  {
    id: 18,
    theme: 'admin',
    block: '3',
    question: 'Los actos administrativos que ponen fin a la vía administrativa pueden ser recurridos mediante:',
    options: [
      'Recurso de alzada',
      'Recurso potestativo de reposición o recurso contencioso-administrativo',
      'Recurso de amparo directamente',
      'No son recurribles',
    ],
    answer: 1,
    explanation:
      'Contra los actos que agotan la vía administrativa cabe recurso potestativo de reposición o directamente recurso contencioso-administrativo.',
  },
]

export default questions
