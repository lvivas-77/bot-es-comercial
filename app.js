import { createBot, createProvider, createFlow, addKeyword } from '@builderbot/bot'
import BaileysProvider from '@builderbot/provider'
import MemoryDB from '@builderbot/database'

const URL_ASESOR = 'https://whatsapp.com'

const flujoSalir = addKeyword(['salir', 'finalizar']).addAnswer([
    'Muchas gracias por comunicarte con *ES Comercial*.',
    'Recuerda que si deseas volver a consultar nuestros planes, solo debes escribir *Hola*.',
    '¡Que tengas un feliz resto de día! 🤗'
])

const flujoAsesorDirecto = addKeyword(['asesor', 'hablar con asesor', 'habla con asesor', 'informacion', 'más información', 'mas informacion']).addAnswer([
    '🤝 ¡Perfecto! Te voy a conectar directamente con uno de nuestros asesores.',
    'Haz *clic* en el siguiente enlace y presiona *enviar* en la conversación para recibir atención personalizada:',
    '',
    `${URL_ASESOR}`,
    '',
    'Fue un gusto atenderte hoy. ¡Feliz resto de día! 🤗'
])

const flujoTransferenciaAsesor = addKeyword(['Si', 'sí', 'si', 'SÍ', 'Comprar plan', 'Continuar'])
    .addAnswer([
        '¡Excelente elección! Te guiaremos en tu proceso de *Compra* corporativa.',
        'Haz *clic* en el siguiente enlace y presiona *enviar* en la conversación para que un asesor reciba tu solicitud de inmediato:',
        '',
        `${URL_ASESOR}`,
        '',
        'Complete el siguiente *Formulario* con toda la información técnica de su establecimiento cuando el asesor se lo solicite.',
        'Fue un gusto darte la información, recuerda que hablaste con *Alan* tu Agente Virtual. ¡Listo! Un asesor de nuestro equipo se pondrá en contacto contigo en breve. Por favor aguarda un momento. ⏱️',
        'Feliz resto de día 🤗🤗🤗'
    ])

const flujoPlanLite = addKeyword(['1', 'lite', 'plan lite'])
    .addAnswer([
        '¡Perfecto! Has seleccionado 😁 *Plan LITE*:',
        '- *Contactos alcanzados:* 200',
        '- *Tamaño de mensaje:* 160 caracteres',
        '- *Precio por pauta:* *$20.000 COP*',
        '',
        '🚀 *¡Haz que tus vecinos te compren a ti y no a la competencia!*',
        '¿Tienes un negocio y quieres atraer clientes que realmente vivan o transiten cerca de tu establecimiento? Con nuestras pautas publicitarias hiperlocales, llevamos tu oferta directamente al teléfono de las personas de tu localidad.',
        '',
        '📲 *PLAN LITE (Ideal para empezar a vender hoy mismo)*',
        '• *Alcance:* 200 contactos directos en tu localidad.',
        '• *Mensaje:* 160 caracteres (efectivo, directo y al grano).',
        '• *Inversión: Solo $20.000 COP por pauta.*',
        '',
        '🎯 *¿Por qué funciona?*',
        '- No malgastas dinero mostrando tu publicidad a personas al otro lado de la ciudad.',
        '- Llegamos exactamente al público que puede caminar o pedir domicilio a tu local.',
        '- Resultados inmediatos con una inversión súper baja.',
        '',
        '💡 ¡Llega a *200 clientes potenciales* de tu zona por solo *$20.000 COP*!',
        '',
        '📌 *Horario permitido de envío de mensajes:*',
        '- *Lunes a viernes:* 8:00 AM a 6:00 PM',
        '- *Sábado:* 9:00 AM a 2:00 PM',
        '',
        '¿Estás seguro de la compra del *Plan LITE*?',
        'Responde *Si* para continuar y ser transferido a un asesor.',
        'Recuerda: escribe *Volver* para regresar al menú o *Salir* para terminar.'
    ], null, null, [flujoTransferenciaAsesor])

const flujoPlanSmart = addKeyword(['2', 'smart', 'plan smart'])
    .addAnswer([
        '¡Perfecto! Has seleccionado 🤩 *Plan SMART*:',
        '- *Contactos alcanzados:* 500',
        '- *Tamaño de mensaje:* 160 caracteres',
        '- *Precio por pauta:* *$50.000 COP*',
        '',
        '🔥 *¡Multiplica tus ventas locales y domina tu zona!*',
        'Si quieres que más vecinos conozcan tu negocio, el *Plan SMART* está diseñado para darle un impulso real a tu establecimiento llevando tu mensaje directamente al celular de los clientes de tu localidad.',
        '',
        '📲 *PLAN SMART (El favorito para acelerar ventas)*',
        '• *Alcance*: 500 contactos directos en tu localidad.',
        '• *Mensaje*: 160 caracteres (directo, claro y con llamado a la acción).',
        '• *Inversión: Solo $50.000 COP por pauta.*',
        '',
        '💥 *¿Por qué elegir el Plan SMART?*',
        '- *Más del doble de clientes:* Alcanza a 500 personas interesadas en tu zona de cobertura.',
        '- *Publicidad hiperlocal:* Cero presupuesto desperdiciado; solo personas que realmente pueden comprarte hoy.',
        '- *Alta conversión:* Llega directamente por mensajería a tus potenciales compradores.',
        '',
        '💡 *¡Haz que 500 vecinos conozcan tu local por solo $50.000 COP!*',
        '',
        '📌 *Horario permitido de envío de mensajes:*',
        '- *Lunes a viernes:* 8:00 AM a 6:00 PM',
        '- *Sábado:* 9:00 AM a 2:00 PM',
        '',
        '¿Estás seguro de la compra del *Plan SMART*?',
        'Responde *Si* para continuar y ser transferido a un asesor.',
        'Recuerda: escribe *Volver* para regresar al menú o *Salir* para terminar.'
    ], null, null, [flujoTransferenciaAsesor])

const flujoPlanSmartPro = addKeyword(['3', 'smart pro', 'pro', 'plan smart pro'])
    .addAnswer([
        '¡Perfecto! Has seleccionado 🥳 *Plan SMART PRO (Recomendado)*:',
        '- *Contactos alcanzados:* 500',
        '- *Tamaño de mensaje:* 320 caracteres',
        '- *Precio por pauta:* *$70.000 COP*',
        '',
        '👑 *¡El paquete perfecto para convencer, enamorar y vender!*',
        '¿Tienes una oferta especial? El *Plan SMART PRO* te da el tamaño doble para comunicar todo de tu marca sin dejar nada por fuera.',
        '',
        '📲 *Plan SMART PRO ⭐ (El más recomendado)*',
        '• *Alcance:* 500 contactos directos en tu localidad.',
        '• *Tamaño de mensaje:* 320 caracteres (¡El doble de espacio para incluir promociones y enlaces!).',
        '• *Inversión:* $70.000 COP por pauta.',
        '',
        '💎 *¿Por qué es el plan preferido por los comercios?*',
        '- *Doble tamaño:* Puedes incluir información clara, horarios o enlaces a tu WhatsApp para comunicación directa.',
        '- *Cobertura estratégica:* 500 vecinos clave de tu localidad recibirán una propuesta completa e imposible de ignorar.',
        '- *Mayor tasa de conversión:* Un mensaje largo informa mejor.',
        '',
        '💡 *¡Comunica todo el poder de tu negocio a 500 clientes locales por solo $70.000 COP!*',
        '',
        '📌 *Horario permitido de envío de mensajes:*',
        '- *Lunes a viernes:* 8:00 AM a 6:00 PM',
        '- *Sábado:* 9:00 AM a 2:00 PM',
        '',
        '¿Estás seguro de la compra del *Plan SMART PRO*?',
        'Responde *Si* para continuar y ser transferido a un asesor.',
        'Recuerda: escribe *Volver* para regresar al menú o *Salir* para terminar.'
    ], null, null, [flujoTransferenciaAsesor])

const flujoBienvenida = addKeyword(['hola', 'buenos dias', 'buenas tardes', 'pauta', 'inicio', 'volver', 'menu', 'menú'])
    .addAnswer([
        '👋 Hola bienvenido a *ES Comercial*, ¡soy *Alan* tu agente virtual! 🧑‍💻',
        'Vendemos pautas publicitarias por localidad del establecimiento de comercio, llegando a clientes reales de tu sector.',
        '',
        'Tenemos los siguientes planes disponibles:',
        '',
        '😁 *1. Plan LITE*:',
        '• Contactos alcanzados: 200',
        '• Tamaño de mensaje: 160 caracteres',
        '• Precio por pauta: *$20.000 COP*',
        '',
        '🤩 *2. Plan SMART*:',
        '• Contactos alcanzados: 500',
        '• Tamaño de mensaje: 160 caracteres',
        '• Precio por pauta: *$50.000 COP*',
        '',
        '🥳 *3. Plan SMART PRO (Recomendado)*:',
        '• Contactos alcanzados: 500',
        '• Tamaño de mensaje: 320 caracteres',
        '• Precio por pauta: *$70.000 COP*',
        '',
        '¿Qué Plan deseas comprar? Escribe el número correspondiente (*1*, *2* o *3*).',
        '',
        '💬 Si necesitas hablar directamente con un asesor o pedir una factura, escribe la palabra *Asesor*.',
        '🚪 Escribe *Salir* en cualquier momento para finalizar la conversación.'
    ], null, null, [flujoPlanLite, flujoPlanSmart, flujoPlanSmartPro, flujoAsesorDirecto, flujoSalir])

const main = async () => {
    const adapterDB = new MemoryDB()
    const adapterFlow = createFlow([flujoBienvenida, flujoSalir, flujoAsesorDirecto])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
}

main()
