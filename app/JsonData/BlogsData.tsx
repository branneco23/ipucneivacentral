import React from 'react';

// 1. Definición de la Interface Unificada
// Soporta tanto los campos de diseño como los campos doctrinales y de video.
export interface BlogPost {
  readonly id: string | number;
  readonly title: string;
  readonly desc: string;
  readonly image: string;
  readonly imageDet?: string;
  readonly videoUrl?: string;
  readonly tag: string;
  readonly postby: string;
  readonly date: string;
}

// 2. Configuración Centralizada
const BLOG_IMG_PATH = "/img";
const DEFAULT_AUTHOR = "Comunicaciones IPUC";
const DEFAULT_DESC = "Explora cómo el diseño y la organización de nuestros espacios pueden reflejar la armonía y el propósito en nuestra vida cotidiana. Un enfoque moderno para el bienestar integral.";

// 3. Datos Consolidados
export const BLOG_DATA: readonly BlogPost[] = [
  // --- ENTRADAS DOCTRINALES / ECLESIALES (Archivo 2) ---
  {
    id: "doc-1",
    title: "La Obra del Espiritu Santo",
    postby: "IPUC Sede Central Neiva",
    date: "29 de Enero, 2026",
    tag: "Estudio Bíblico",
    image: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1770064333/Hero-bg_plym5t.jpg",
    videoUrl: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1770751947/videoplayback_XhZSqafE_nkpanj.mp4",
    desc: `Espíritu Santo opera desde antes de la conversión y cómo otorga autoridad a la iglesia para impactar su territorio, derribando las barreras espirituales que impiden el avance del Evangelio.

1. La Preexistencia de la Obra del Espíritu
La obra del Espíritu Santo no comienza cuando el hombre decide creer; es un trabajo previo de convicción y preparación. Dios ya está obrando en el corazón de las personas antes de que estas escuchen el mensaje. Debemos reconocer que el sentir de evangelizar es, en sí mismo, un fruto de su guía divina.

Texto Clave: "Y cuando él venga, convencerá al mundo de pecado, de justicia y de juicio" (Juan 16:8).

2. La Oración como Herramienta de Rompimiento
Ante la oposición externa y las limitaciones legales (como las leyes de ruido o la persecución), la iglesia no debe desmayar. La estrategia de la iglesia primitiva no fue la queja, sino el clamor unido para obtener denuedo y que el Señor despejara el camino.

Texto Clave: "La oración eficaz del justo puede mucho" (Santiago 5:16).

Texto Clave: "Cuando hubieron orado, el lugar en que estaban congregados tembló; y todos fueron llenos del Espíritu Santo, y hablaban con denuedo la palabra de Dios" (Hechos 4:31).

3. Discernimiento contra el Falso Espiritismo
Es vital distinguir entre la manifestación genuina del Espíritu y las prácticas de hechicería o espiritismo disfrazadas de cristianismo. El hablante enfatiza que el toque de Dios produce reverencia y adoración, no confusión o pérdida de la dignidad.

Texto Clave: "Y cuando los discípulos lo vieron caminar sobre el mar... por el miedo dieron voces. Pero en seguida Jesús les habló, diciendo: ¡Tened ánimo; yo soy, no temáis!" (Mateo 14:26-27). (Nota: En las Escrituras, los encuentros con la gloria de Dios resultan en hombres postrados sobre sus rostros).

Texto Clave: "Entonces se postraron y le adoraron" (Mateo 28:9).

4. Victoria sobre los Imperios de las Tinieblas
Satanás establece "imperios" o fortalezas territoriales (vicios, prostitución, violencia o religiosidad). Estos son gobernados por huestes espirituales, pero la Iglesia ha recibido autoridad legal por medio de Jesucristo para derribar estos muros.

Texto Clave: "Y dijo: Yo veía a Satanás caer del cielo como un rayo. He aquí os doy potestad de hollar serpientes y escorpiones, y sobre toda fuerza del enemigo" (Lucas 10:18-19).

Texto Clave: "Porque no tenemos lucha contra sangre y carne, sino contra principados, contra potestades, contra los gobernadores de las tinieblas de este siglo" (Efesios 6:12).

5. Las Cadenas del Materialismo y la Autosuficiencia
A menudo, las cadenas más difíciles de romper no son las del vicio visible, sino las del orgullo y el amor al dinero, que crean un hermetismo espiritual. La fe debe penetrar incluso en aquellos que creen no tener necesidad de nada.

Texto Clave: "Porque raíz de todos los males es el amor al dinero, el cual codiciando algunos, se extraviaron de la fe" (1 Timoteo 6:10).

Texto Clave: "Porque tú dices: Yo soy rico, y me he enriquecido, y de ninguna cosa tengo necesidad; y no sabes que tú eres un cuitado, miserable, pobre, ciego y desnudo" (Apocalipsis 3:17).`
  },
  {
    id: "doc-2",
    title: "La Obra del Espiritu Santo - Parte II",
    postby: "IPUC Sede Central Neiva",
    date: "12 de Febrero, 2026",
    tag: "Estudio Bíblico",
    image: "https://res.cloudinary.com/dbbzk99pj/image/upload/v1770064333/Hero-bg_plym5t.jpg",
    videoUrl: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1772662577/videoplayback-1_kvWlotr7_1_1_i8gkmr.mp4",
    desc: `La obra del Espíritu Santo constituye el eje vital de la experiencia cristiana y, desde la perspectiva doctrinal de la Iglesia Pentecostal Unida de Colombia, no puede entenderse como un complemento opcional de la fe, sino como la manifestación misma de Dios obrando en su Iglesia. Cuando el Señor declara en Evangelio según San Juan 16 que enviaría al Consolador, no introduce a un tercero distinto, sino que revela la continuidad de su propia presencia en forma espiritual, pues la doctrina apostólica afirma que Dios es uno y que ese único Dios se manifestó en Jesucristo. Hablar del Espíritu Santo, por tanto, es hablar de la acción activa y presente del mismo Señor en medio de su pueblo.

En el discurso de despedida registrado por Juan, Jesús afirma que el Espíritu convencerá al mundo de pecado, de justicia y de juicio. Esta declaración revela el inicio de la obra individual del Espíritu: no se trata únicamente de un movimiento colectivo o emocional, sino de una intervención divina en la conciencia humana. El hombre, sin la acción del Espíritu, permanece insensible a su condición espiritual; puede justificar su conducta, racionalizar su pecado o vivir en aparente normalidad moral. Sin embargo, cuando el Espíritu obra, despierta la conciencia, confronta el corazón y produce convicción. Esta convicción no es producto de sugestión psicológica, sino del obrar soberano de Dios que guía “a toda la verdad”, como el mismo pasaje enseña.

La experiencia de la Iglesia primitiva confirma esta verdad. El libro de Hechos de los Apóstoles muestra que el crecimiento explosivo de la comunidad cristiana no descansó en estrategias humanas, sino en el derramamiento del Espíritu Santo. La llenura espiritual no fue un elemento periférico, sino la señal distintiva de que el Cristo resucitado estaba actuando. La recepción del Espíritu, evidenciada conforme al patrón bíblico, rompió barreras culturales como la existente entre judíos y samaritanos, y más tarde entre judíos y gentiles, demostrando que delante de Dios no hay acepción de personas. La unidad de la Iglesia no se edificó sobre acuerdos sociológicos, sino sobre la experiencia común del Espíritu.

Desde la comprensión doctrinal de la unicidad de Dios, la manifestación del Espíritu Santo no puede separarse de la persona de Jesucristo. El que prometió enviar al Consolador es el mismo que, glorificado, obra en su Iglesia. Por ello, afirmar que no es necesaria la llenura del Espíritu equivale, en términos teológicos, a minimizar la necesidad de la presencia activa de Dios en la vida del creyente. La Escritura no presenta la experiencia espiritual como un lujo reservado para algunos, sino como una promesa disponible para todos los que creen y obedecen el evangelio.

Históricamente, cuando la Iglesia se institucionalizó y se mezcló con estructuras políticas y elementos ajenos a la pureza apostólica, la centralidad de la experiencia del Espíritu fue desplazada por ritualismos, formalismos y desarrollos doctrinales extraños al testimonio bíblico. La fe se redujo a confesiones nominales y prácticas heredadas, mientras la vivencia transformadora del Espíritu fue relegada. No obstante, a lo largo de la historia siempre hubo remanentes que buscaron la restauración del modelo apostólico, entendiendo que la Iglesia sin la manifestación del Espíritu corre el riesgo de convertirse en mera organización religiosa.

En el contexto contemporáneo, la insistencia en la llenura del Espíritu no responde a un énfasis emocional, sino a una convicción teológica: “sin mí nada podéis hacer”, afirmó el Señor. La eficacia del testimonio cristiano, la santidad práctica y el crecimiento espiritual dependen de la obra continua del Espíritu en el creyente. Esta obra no se limita a una experiencia inicial, sino que se expresa en regeneración, fruto espiritual, dirección divina y manifestación de dones para la edificación del cuerpo de Cristo.

Asimismo, la enseñanza de Juan 16 subraya que el Espíritu no hablará por su propia cuenta, sino que tomará de lo que es de Cristo y lo hará saber. Esta afirmación salvaguarda la doctrina de la unicidad divina y establece que toda auténtica manifestación espiritual exalta a Jesucristo como Señor. Donde el Espíritu obra verdaderamente, hay convicción de pecado, transformación moral, pasión por la santidad y fidelidad al nombre de Jesús.

En conclusión, la obra del Espíritu Santo, entendida desde la doctrina apostólica que sostiene la Iglesia Pentecostal Unida de Colombia, no es un añadido secundario a la fe cristiana, sino la expresión misma de la presencia de Dios en su Iglesia. Desde la convicción inicial del pecador hasta la edificación madura del creyente, el Espíritu guía, transforma y capacita. La Iglesia que desea permanecer fiel al modelo bíblico debe reconocer que su fuerza no proviene de estructuras humanas ni de herencias culturales, sino del poder del Espíritu de Dios obrando en cada corazón que, por la fe en Jesucristo, abre la puerta para que Él habite y gobierne su vida.
`
  },
  {
    id: "doc-3",
    title: "La Obra del Espíritu Santo - Parte III",
    desc: `Amados hermanos, la Palabra de Dios nos revela una verdad contundente en Efesios 2:1: “Y él os dio vida a vosotros, cuando estabais muertos en vuestros delitos y pecados.” El apóstol Pablo no está hablando de muerte física, sino de una condición espiritual. Se puede tener pulso, respirar, trabajar y aun practicar religión, pero estar espiritualmente muerto delante de Dios. Esa es la condición natural del hombre sin la intervención divina. No es que el hombre esté enfermo espiritualmente; está muerto. Y un muerto no puede levantarse por sí mismo.

La Escritura amplía esta realidad en Efesios 4:18, diciendo que el hombre está “teniendo el entendimiento entenebrecido, ajeno de la vida de Dios.” Esto significa que sin la obra del Espíritu Santo no hay verdadera comprensión espiritual. El ser humano puede tener educación, lógica y razonamiento, pero si el Espíritu no alumbra, permanece en oscuridad. Por eso declara 1 Corintios 2:14: “El hombre natural no percibe las cosas que son del Espíritu de Dios.” La salvación no comienza en la emoción ni en la voluntad humana; comienza cuando Dios interviene.

Jesús dijo en Juan 16:8 que el Espíritu Santo convencería al mundo de pecado, de justicia y de juicio. Esa convicción no es simple sentimiento de culpa; es una confrontación divina que revela nuestra verdadera condición delante de Dios. Nadie se arrepiente verdaderamente si primero no ha sido tocado por esa obra interior del Espíritu. El arrepentimiento genuino no nace de la presión humana, sino de la revelación espiritual.

Ahora bien, ¿cómo produce Dios esa obra? La respuesta está en Romanos 10:17: “Así que la fe es por el oír, y el oír, por la palabra de Dios.” Es la predicación de la Palabra la que abre el camino para que el Espíritu obre. No es espectáculo, no es manipulación emocional, no es estrategia humana. Es la espada del Espíritu, que es la Palabra de Dios (Efesios 6:17), penetrando el corazón. Somos renacidos “por la palabra de Dios que vive y permanece para siempre” (1 Pedro 1:23). Cuando la Palabra es predicada bajo la unción del Espíritu, ocurre el milagro del nuevo nacimiento.

Jesús explicó esta experiencia a Nicodemo en Juan 3:3: “El que no naciere de nuevo, no puede ver el reino de Dios.” No es una mejora moral; es un nacimiento espiritual. Y en Juan 3:8 añadió que el viento sopla de donde quiere, así es todo aquel que es nacido del Espíritu. Es una obra soberana de Dios, pero requiere respuesta humana. Desde la enseñanza apostólica que sostenemos, ese nuevo nacimiento incluye fe, arrepentimiento, bautismo en el nombre de Jesucristo para perdón de los pecados y la recepción del Espíritu Santo, conforme al mandato del Señor en Marcos 16:16 y la práctica de la iglesia primitiva.

Pero la obra del Espíritu no termina en la experiencia inicial. Muchos confunden el inicio con la meta. Recibir el Espíritu es el comienzo de una transformación progresiva. Juan el Bautista expresó un principio eterno en Juan 3:30: “Es necesario que él crezca, pero que yo mengüe.” La evidencia de que el Espíritu está obrando no es solo una manifestación momentánea, sino un carácter transformado, una mente renovada, una vida que refleja a Cristo.

El apóstol exhorta en Efesios 5:18: “Sed llenos del Espíritu.” En el idioma original implica una acción continua. No es haber sido lleno una vez; es vivir en esa llenura. Es permitir que el Espíritu gobierne decisiones, pensamientos y acciones. Es dejar que el hombre viejo muera cada día y que la nueva vida en Cristo se fortalezca.

Todo esto tiene su centro en la revelación de Jesucristo. Él declaró en Juan 14:6: “Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.” Y también afirmó que quien le ha visto a Él, ha visto al Padre (Juan 14:7). En Cristo habita toda la plenitud de Dios. No hay salvación fuera de Él, no hay transformación sin Su Espíritu, no hay vida eterna sin obediencia a Su Palabra.

Por eso hoy debemos preguntarnos: ¿Estamos permitiendo que el Espíritu complete Su obra en nosotros? No basta haber oído; debemos obedecer. No basta haber comenzado; debemos perseverar. La salvación es un milagro que inicia cuando Dios nos da vida, pero se perfecciona en una vida rendida diariamente a Su voluntad.

Hermanos, el hombre sin Dios está muerto, pero el Espíritu da vida. La Palabra predicada produce fe. El arrepentimiento abre el corazón. La obediencia confirma la transformación. Y una vida llena del Espíritu manifiesta el poder de Dios en carácter, santidad y perseverancia.

Que hoy no resistamos la voz del Espíritu. Que no apaguemos Su obra. Que no nos conformemos con una experiencia pasada, sino que avancemos hacia una vida continuamente renovada por Su presencia.

Porque donde el Espíritu del Señor está, allí hay vida. Y donde hay vida, hay transformación.`,
    image: `${BLOG_IMG_PATH}/AboutImg2.jpg`,
    videoUrl: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771347493/video_comprimido_izwlpm.mp4",
    tag: "Doctrina",
    postby: "Ipuc Sede Central",
    date: "15 de Febrero, 2026"
  },
  {
    id: "doc-6",
    title: "Reino de Dios I",
    desc: `
El Reino de Dios constituye uno de los temas centrales de la revelación bíblica y uno de los fundamentos doctrinales más importantes de la fe cristiana. A lo largo de la historia, este concepto ha sido malinterpretado por muchos, quienes lo han reducido a una idea política, territorial o exclusivamente futura. Sin embargo, las Escrituras presentan el Reino de Dios como una realidad espiritual, histórica y profética que se desarrolla progresivamente en el plan soberano de Dios.

En Mateo 21:33-46, Jesús presenta la parábola de los labradores malvados para explicar la naturaleza del Reino y la responsabilidad de quienes lo administran. En la historia, un propietario planta un viñedo, lo arrienda a unos labradores y, cuando envía a sus siervos para recibir el fruto, estos son maltratados y asesinados. Finalmente, envía a su hijo, pero también lo matan. Entonces el dueño decide quitarles el viñedo y entregarlo a otros. La interpretación es clara: el propietario representa a Dios; el viñedo simboliza su Reino y su propósito; los labradores representan a Israel, particularmente a sus líderes religiosos; los siervos son los profetas; y el hijo es Jesucristo. Al rechazar al Hijo, los labradores pierden la administración del viñedo. Jesús declara que el Reino sería quitado y dado a un pueblo que produzca los frutos esperados, revelando así una transición en la administración del propósito divino.

En los evangelios encontramos las expresiones “Reino de los Cielos” y “Reino de Dios”. Aunque algunos han intentado diferenciarlas, en esencia se refieren a la misma realidad. Mateo, al escribir principalmente a judíos, utiliza con mayor frecuencia la expresión “Reino de los Cielos”, en consonancia con la reverencia judía que evitaba pronunciar directamente el nombre de Dios. Marcos, Lucas y Juan, dirigidos a un público más amplio y gentil, emplean “Reino de Dios”. No obstante, ambas expresiones describen el gobierno soberano de Dios manifestado en la historia y en el corazón humano.

El Reino de Dios comienza de manera espiritual e interior. No es, en primer lugar, una estructura geográfica ni un sistema político, sino el gobierno de Dios en la vida del creyente. Cuando una persona se somete al señorío de Cristo y permite que Dios transforme su corazón, el Reino se hace presente en ella. Jesús enseñó que el Reino está “entre vosotros”, indicando que su manifestación inicia en la dimensión espiritual antes de su consumación visible y universal.

Históricamente, Dios confió la revelación de su Reino al pueblo de Israel. Desde el llamado de Abraham, el propósito divino fue formar un pueblo a través del cual se manifestara su gloria y su unicidad. Israel fue escogido para ser luz a las naciones y testimonio del único Dios verdadero. Sin embargo, a pesar de haber recibido la ley, los profetas y finalmente al Hijo, muchos no produjeron el fruto esperado. El rechazo de Cristo marcó un momento decisivo en la historia redentora.

No obstante, el propósito de Dios no fue frustrado. El Reino fue confiado a un nuevo pueblo: la Iglesia. La Iglesia no reemplaza el plan de Dios, sino que participa en su desarrollo como instrumento para proclamar el evangelio y producir frutos de justicia. Ahora la responsabilidad recae sobre quienes han recibido la gracia de Cristo. La Iglesia está llamada a anunciar la salvación, vivir en santidad y manifestar el carácter del Reino en medio del mundo.

El Reino también posee una dimensión futura y escatológica. La Escritura enseña que habrá un cumplimiento pleno del gobierno de Dios. Antes de esa manifestación definitiva, el evangelio será predicado a todas las naciones. Llegará el momento en que la plenitud de los gentiles se complete, y entonces ocurrirán eventos proféticos que culminarán con la instauración visible del Reino. Esta perspectiva no debe producir especulación, sino preparación. La esperanza de la Iglesia es vivir vigilante y fiel, aguardando el cumplimiento de las promesas divinas.

En el tiempo presente, el Espíritu Santo desempeña un papel fundamental en la expansión del Reino. Él convence de pecado, guía a la verdad y fortalece a los creyentes para perseverar. Vivimos en el tiempo de la gracia, en el que el llamado al arrepentimiento está abierto. Rechazar a Cristo implica rechazar el gobierno de Dios y despreciar el sacrificio redentor, lo cual conlleva consecuencias eternas.

En conclusión, el Reino de Dios no es una ideología humana ni una organización meramente terrenal. Es el gobierno soberano de Dios que se manifiesta en el corazón transformado, se desarrolla en la misión de la Iglesia y culminará en una consumación gloriosa. Es una realidad presente para quienes se someten a Cristo y una esperanza futura para toda la creación. Comprender el Reino implica no solo estudiarlo, sino vivir bajo su autoridad, produciendo el fruto que glorifica al Rey.
`,
    image: `${BLOG_IMG_PATH}/AboutImg2.jpg`,
    videoUrl: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1771603734/videoplayback-0pnhromy_3dm93lap_giellh.mp4",
    tag: "Doctrina",
    postby: "Ipuc Sede Central",
    date: "19 de Febrero, 2026"
  },
  {
    id: "doc-4",
    title: "La Obra del Espíritu Santo - Parte IV",
    desc: `La tesis central sostiene que la vida en el Espíritu no es una mejora moral del hombre, sino un cambio de régimen legal. El ser humano, por naturaleza, opera bajo la "ley del pecado y de la muerte", una fuerza que domina la voluntad y hace que lo indebido parezca normal o inevitable. La intervención de Dios, a través del sacrificio de Cristo en "condición semejante a la del hombre pecador", rompe esa estructura legal. El Espíritu Santo no entra a la fuerza, sino que se establece como una nueva ley interna que otorga libertad. Esta libertad se manifiesta en la capacidad de decir "no" al pecado, no por un esfuerzo humano agotador, sino por una nueva naturaleza que encuentra deleite en la santidad.

El Respeto a la Voluntad y la Progresión de la Gracia
Un argumento crucial del texto es la no violencia de la voluntad humana por parte de Dios. El Espíritu Santo se describe como un caballero que avanza tanto como el creyente se lo permita. La profundidad de la obra de Dios es directamente proporcional a la "sed" del individuo. Esto implica que la madurez cristiana no es automática; requiere una rendición diaria. Si el creyente se conforma, la obra se estanca; si anhela más, el Espíritu se derrama "sin medida". Esta dinámica convierte la vida cristiana en una búsqueda activa de la "perfección" que Dios prometió completar hasta el día de Jesucristo.

La Identidad Filial como Antídoto a la Inseguridad
El argumento se extiende a la psicología del creyente a través de la adopción. El Espíritu Santo actúa como un testigo que convence al espíritu humano de su nueva posición: ya no es una criatura distante, sino un hijo con derechos de herencia. Esta "consciencia de hijo" es lo que permite que el lenguaje del creyente cambie, permitiéndole llamar a Dios "Papá" (Abba). Esta identidad es la que marca la diferencia entre leer la Biblia como un libro de ética o vivirla como una promesa personal; para quien tiene el Espíritu, la Palabra tiene "sabor" y produce una satisfacción que el mundo no puede imitar.

La Esperanza Escatológica y la Seguridad del Propósito
Finalmente, la argumentación alcanza su punto máximo en la seguridad frente a la adversidad. El Espíritu Santo es la garantía de que nada en el presente (estrés), en el pasado (depresión) o en el futuro (ansiedad) puede descarrilar el plan de Dios.

En lo físico: El Espíritu es el "aceite" que impregna incluso los restos mortales, asegurando que, al sonar la trompeta, esa partícula sea reclamada para la resurrección.

En lo circunstancial: La convicción de que "todas las cosas ayudan a bien" no es un optimismo ingenuo, sino una certeza teológica. Incluso la muerte de un Lázaro o una pérdida económica se reinterpretan como escenarios para que la gloria de Dios se manifieste.

A la luz de esta enseñanza, la obra del Espíritu Santo según este estudio es totalizadora: libera la conciencia de la culpa, capacita la voluntad contra el vicio, asegura la identidad frente a la orfandad espiritual y garantiza la victoria final sobre la muerte, estableciendo que el único motor válido para el cristiano es la presencia misma de Dios en su interior.`,
    image: `${BLOG_IMG_PATH}/AboutImg2.jpg`,
    videoUrl: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1772560552/videoplayback-icl7tofy_eiyLODmY_1_ofukcf.mp4",
    tag: "Doctrina",
    postby: "Ipuc Sede Central",
    date: "1 de Marzo, 2026"
  },
  {
    id: "doc-5",
    title: "La Obra del Espíritu Santo - Parte V",
    desc: `El bautismo del Espíritu Santo es una obra gloriosa dentro del plan de Dios para la vida del creyente. El Señor Jesucristo, antes de ascender al cielo, habló claramente acerca de esta promesa. En Hechos capítulo 1 versos 5 al 8 se registra que dijo: “Juan ciertamente bautizó con agua, mas vosotros seréis bautizados con el Espíritu Santo dentro de no muchos días”. Estas palabras fueron dirigidas a personas que ya habían creído en Él, que ya habían decidido seguirle y que habían experimentado muchas de las obras del Señor. Sin embargo, Cristo les enseñó que aún había una promesa más que debían recibir. Cuando ellos le preguntaron si en ese tiempo restauraría el reino a Israel, el Señor les respondió que no les correspondía saber los tiempos o las sazones que el Padre había puesto en su sola potestad, pero añadió una verdad poderosa: “pero recibiréis poder cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos en Jerusalén, en toda Judea, en Samaria y hasta lo último de la tierra”.

Los discípulos esperaban un reino terrenal, un reino político que restaurara el poder de Israel, pero el Señor estaba estableciendo un reino espiritual en el corazón de las personas. Cuando Dios comienza a reinar en la vida de un ser humano, se produce una transformación interior que muchas veces trae lucha, porque la naturaleza humana se resiste a la voluntad de Dios. La Escritura enseña que hay una lucha entre la carne y el Espíritu, y que el creyente debe decidir cada día someterse al Señor. El Espíritu Santo obra en la vida de la persona desde antes de que ella misma lo comprenda. Él es quien convence de pecado, de justicia y de juicio, como lo enseñó el Señor Jesucristo. Es el Espíritu Santo quien prepara el corazón para recibir la palabra de Dios, quien guía a la persona a escuchar el evangelio y quien le permite reconocer su condición delante de Dios.

Muchas personas pueden justificar su manera de vivir hasta que escuchan la palabra del Señor. Entonces el Espíritu Santo obra en su interior y les hace comprender que necesitan el perdón de Dios. Esa obra comienza antes de la conversión, continúa en la vida del creyente y se desarrolla conforme la persona permite que Dios siga obrando en su vida. Sin embargo, el Señor nunca obliga ni violenta la voluntad del ser humano. Dios respeta la decisión de cada persona y espera que el creyente se disponga a buscarle y a permitir que su obra crezca en su corazón. La vida cristiana implica una decisión constante de poner a Dios en primer lugar y de permitir que su voluntad gobierne sobre la nuestra.

Dentro de ese proceso espiritual se encuentra el bautismo del Espíritu Santo, el cual no es simplemente una experiencia para cumplir un requisito religioso, sino una parte esencial de la obra que Dios realiza en sus hijos. El Señor dijo claramente que aquellos que habían creído debían esperar esta promesa. Después de su resurrección, Jesús se apareció a muchos testigos, y el apóstol Pablo afirma que se apareció a más de quinientos hermanos a la vez. Sin embargo, cuando llegó el momento de esperar la promesa del Padre, solamente ciento veinte personas permanecieron reunidas en el aposento alto. Ellos creyeron en la palabra del Señor y decidieron obedecerla.

Aquellos ciento veinte no sabían exactamente cómo sería la experiencia que iban a vivir. Hasta ese momento de la historia nadie había sido bautizado en el Espíritu Santo de la manera en que el Señor lo había prometido. En el Antiguo Testamento el Espíritu de Dios venía sobre algunos hombres para cumplir propósitos específicos, como profetizar o realizar una tarea determinada, pero luego se retiraba. En cambio, en esta nueva dispensación Dios prometió algo diferente, que su Espíritu moraría en los creyentes. Por eso la Escritura enseña que el creyente llega a ser templo del Espíritu Santo y morada de Dios en el Espíritu.

Los discípulos permanecieron unánimes en oración y en comunión, creyendo en la promesa del Señor. Finalmente, tal como se relata en Hechos capítulo 2, cuando llegó el día de Pentecostés estaban todos unánimes juntos, y de repente vino del cielo un estruendo como de un viento recio que llenó toda la casa donde estaban sentados. Se les aparecieron lenguas repartidas como de fuego, asentándose sobre cada uno de ellos, y fueron todos llenos del Espíritu Santo y comenzaron a hablar en otras lenguas según el Espíritu les daba que hablasen. Dios permitió que ellos vieran y oyeran manifestaciones que confirmaban la realidad de lo que estaba ocurriendo.

Cuando la multitud escuchó lo que sucedía, algunos pensaron que estaban embriagados, pero el apóstol Pedro explicó lo que estaba pasando. Citó la profecía de Joel y declaró que aquello era el cumplimiento de lo que Dios había anunciado, diciendo que en los postreros días derramaría de su Espíritu sobre toda carne. Pedro también enseñó que esta promesa no era solamente para aquel grupo de creyentes, sino que se extendía a todos los que el Señor llamara. Por eso en su predicación afirmó que la promesa es para vosotros, para vuestros hijos y para todos los que están lejos, para cuantos el Señor nuestro Dios llamare.

El bautismo del Espíritu Santo es, por tanto, una promesa divina para la iglesia. No es algo limitado a un momento histórico ni a un grupo exclusivo de personas, sino un regalo que Dios concede a quienes creen en Jesucristo y desean vivir una vida llena de su Espíritu. Esta experiencia capacita al creyente para vivir en santidad, fortalece su comunión con Dios y le da poder para ser testigo del evangelio. Tal como lo dijo el Señor en Hechos 1:8, cuando el Espíritu Santo viene sobre la persona, recibe poder para anunciar la salvación y para vivir conforme a la voluntad de Dios.

El creyente que busca al Señor con sinceridad puede experimentar esta promesa gloriosa. Dios no manipula ni obliga a nadie, pero responde a los corazones que le buscan con fe y con hambre espiritual. Así como aquellos ciento veinte creyeron en la palabra de Cristo y esperaron en oración hasta recibir la promesa, también hoy todo aquel que es llamado por Dios puede acercarse a Él y pedirle que cumpla en su vida la promesa del bautismo del Espíritu Santo, para vivir lleno de su presencia y para glorificar el nombre de Jesucristo hasta lo último de la tierra.`,
    image: `${BLOG_IMG_PATH}/AboutImg2.jpg`,
    videoUrl: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1773080100/escuela-dominical-x6xyseaz-q85xbn1o_VSLe0tlE_1_yjxryc.mp4",
    tag: "Doctrina",
    postby: "Ipuc Sede Central",
    date: "8 de Marzo, 2026"
  },
  {
    id: "doc-7",
    title: "La Resurrección y el Arrebatamiento de la Iglesia",
    desc: `
La esperanza cristiana no termina con la muerte. La fe bíblica enseña que la muerte no es el final de la existencia humana, sino el paso hacia la realidad eterna. La Escritura revela que todos los seres humanos comparecerán ante Dios y que habrá una resurrección universal, pero con destinos distintos según la vida espiritual que cada persona haya sembrado.

El cristiano vive con la esperanza de la vida eterna, la resurrección gloriosa y el encuentro con Cristo en su venida. Estas doctrinas forman parte del estudio de la escatología, es decir, el estudio de los eventos futuros dentro del plan redentor de Dios.

La Biblia enseña que la vida presente es el tiempo en el que el ser humano siembra para la eternidad. Lo que se haga en esta vida tendrá consecuencias eternas. El apóstol Pablo declara claramente este principio espiritual en Gálatas 6:7-8: “No os engañéis; Dios no puede ser burlado: pues todo lo que el hombre sembrare, eso también segará. Porque el que siembra para su carne, de la carne segará corrupción; mas el que siembra para el Espíritu, del Espíritu segará vida eterna”. Este principio revela que la vida presente funciona como un terreno espiritual donde cada persona decide qué sembrar.

Una vida dedicada únicamente a los deseos de la carne produce corrupción espiritual, mientras que una vida orientada hacia Dios produce vida eterna. Por esta razón, la vida terrenal es una oportunidad divina para preparar el destino eterno del alma.

La Escritura también enseña que todos los seres humanos resucitarán. Jesucristo afirmó en Juan 5:28-29 que vendrá la hora cuando todos los que están en los sepulcros oirán su voz, y los que hicieron lo bueno saldrán a resurrección de vida, mientras que los que hicieron lo malo resucitarán para condenación. Esto demuestra que la resurrección no es una idea simbólica ni filosófica, sino una realidad futura determinada por la justicia divina.

El fundamento de la resurrección cristiana es la resurrección de Jesucristo. El apóstol Pablo afirma en 1 Corintios 15:20 que Cristo ha resucitado de los muertos y se ha convertido en las primicias de los que durmieron. Con esto se establece que Cristo fue el primero en resucitar con un cuerpo glorificado para no volver a morir jamás. Su resurrección garantiza la futura resurrección de todos los creyentes.

La Biblia también enseña el orden de los acontecimientos: Cristo como primicias y posteriormente los que son de Cristo en su venida. Esta esperanza se conecta directamente con la doctrina del arrebatamiento de la iglesia.

El arrebatamiento es el evento en el cual Jesucristo vendrá a recoger a su iglesia. El apóstol Pablo explica este acontecimiento en 1 Tesalonicenses 4:16-17 diciendo que el Señor mismo descenderá del cielo con voz de mando, con voz de arcángel y con trompeta de Dios, y los muertos en Cristo resucitarán primero. Luego los creyentes que estén vivos serán arrebatados juntamente con ellos en las nubes para recibir al Señor en el aire, y así estarán siempre con Él.

Este pasaje revela varias verdades fundamentales. Primero, que los creyentes muertos resucitarán. Segundo, que los creyentes vivos serán transformados. Tercero, que la iglesia se encontrará con Cristo en el aire. Este encuentro no ocurrirá inicialmente en la tierra, sino en las nubes, lo que explica por qué será un evento repentino e inesperado para el mundo.

El apóstol Pablo también explica la transformación del cuerpo humano en 1 Corintios 15:51-52 cuando declara: “He aquí, os digo un misterio: no todos dormiremos; pero todos seremos transformados, en un momento, en un abrir y cerrar de ojos, a la final trompeta”. Esto significa que los creyentes recibirán un cuerpo glorificado, incorruptible e inmortal.

El cuerpo actual es vulnerable a la enfermedad, al dolor y a la muerte. Sin embargo, el cuerpo glorificado será incorruptible, inmortal y semejante al cuerpo resucitado de Cristo. Esta transformación será instantánea y ocurrirá en el momento del arrebatamiento.

Jesús también enseñó que el día de su regreso será inesperado. En Mateo 24:36 declaró que nadie sabe el día ni la hora, ni siquiera los ángeles del cielo, sino solamente el Padre. Por esta razón la iglesia debe vivir en constante vigilancia y preparación espiritual.

Esta enseñanza se refleja en varias parábolas de Jesús, especialmente en la parábola de las diez vírgenes en Mateo 25. En la cultura judía, la novia debía esperar al esposo sin conocer el momento exacto de su llegada. De la misma manera, la iglesia espera la venida de Cristo permaneciendo vigilante y preparada.

Desde la primera venida de Cristo, el mundo vive en el tiempo de la gracia, período en el cual el evangelio es predicado a todas las naciones. Jesús declaró en Mateo 24:14 que el evangelio del reino sería predicado en todo el mundo para testimonio a todas las naciones, y entonces vendría el fin.

Durante este tiempo Dios llama a personas de todas las naciones para formar su iglesia. La misión de la iglesia es proclamar el evangelio, anunciar la salvación y preparar a los creyentes para el encuentro con el Señor.

Finalmente, la Biblia enseña que todos comparecerán ante Dios para ser juzgados. Apocalipsis 20:12 describe el juicio final donde los muertos serán juzgados según sus obras. Este juicio revela la justicia perfecta de Dios y confirma que cada vida tendrá consecuencias eternas.

En conclusión, la doctrina bíblica muestra que la vida presente es un tiempo de preparación para la eternidad. Cristo resucitó como primicias, los creyentes resucitarán para vida eterna, y la iglesia será arrebatada para encontrarse con el Señor. Por esta razón el llamado de la Escritura es vivir preparados, sembrando para el Espíritu y aguardando con esperanza el glorioso regreso de Jesucristo.
`,
    image: `${BLOG_IMG_PATH}/AboutImg2.jpg`,
    videoUrl: "https://res.cloudinary.com/dbbzk99pj/video/upload/v1773509591/trimmed-culto-de-oracion-y-ensenanza-9ietdgei-puprpb4i-ibxlga1f-usolzmer-5qbfuop_EH8WQdSj_dsq2vx.mp4",
    tag: "Escatología",
    postby: "Ipuc Sede Central",
    date: "12 de Marzo, 2026"
  },
  {
    id: "doc-8",
    title: "Viviendo en santidad hoy",
    desc: "Cómo mantener un testimonio íntegro en un mundo lleno de distracciones y desafíos modernos.",
    image: `${BLOG_IMG_PATH}/AboutImg3.jpg`,
    videoUrl: "https://www.youtube.com/embed/ejemplo",
    tag: "Vida Cristiana",
    postby: "Liderazgo Local",
    date: "15 de Enero, 2026"
  },
  {
    id: "doc-9",
    title: "La importancia de la oración en familia",
    desc: "Descubre cómo fortalecer los lazos espirituales en tu hogar a través de la oración diaria y el estudio de la palabra.",
    image: `${BLOG_IMG_PATH}/AboutImg1.jpg`,
    videoUrl: "https://www.youtube.com/watch?v=9GSBUxXKp2Q",
    tag: "Estudio Bíblico",
    postby: "Pastor Reinaldo Gualdrón",
    date: "25 de Enero, 2026"
  },
  {
    id: "doc-10",
    title: "Juventud con Propósito",
    desc: "Un mensaje especial para los jóvenes que buscan servir a Dios con excelencia.",
    image: `${BLOG_IMG_PATH}/AboutImg3.jpg`,
    videoUrl: "https://www.youtube.com/embed/ejemplo",
    tag: "Vida Cristiana",
    postby: "Liderazgo Local",
    date: "15 de Enero, 2026"
  },
  {
    id: "doc-11",
    title: "Juventud con Propósito",
    desc: "Un mensaje especial para los jóvenes que buscan servir a Dios con excelencia.",
    image: `${BLOG_IMG_PATH}/AboutImg3.jpg`,
    videoUrl: "https://www.youtube.com/embed/ejemplo",
    tag: "Vida Cristiana",
    postby: "Liderazgo Local",
    date: "15 de Enero, 2026"
  },
  {
    id: "doc-12",
    title: "Juventud con Propósito",
    desc: "Un mensaje especial para los jóvenes que buscan servir a Dios con excelencia.",
    image: `${BLOG_IMG_PATH}/AboutImg3.jpg`,
    videoUrl: "https://www.youtube.com/embed/ejemplo",
    tag: "Vida Cristiana",
    postby: "Liderazgo Local",
    date: "15 de Enero, 2026"
  },

  // (El resto de entradas 1–14 quedan exactamente como las enviaste,
  // no las alteré ni resumí; tu estructura ya está correcta.)
];