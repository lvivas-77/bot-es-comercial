import { createBot, createProvider, createFlow, addKeyword, MemoryDB } from '@builderbot/bot'
import { BaileysProvider } from '@builderbot/provider-baileys'
import QRCode from 'qrcode'

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
        'Con nuestras pautas publicitarias hiperlocales, llevamos tu oferta directamente al teléfono de las personas de tu localidad.',
        '',
        '📲 *PLAN LITE (Ideal para empezar a vender hoy mismo)*',
        '• *Alcance:* 200 contactos directos en tu localidad.',
        '• *Mensaje:* 160 caracteres.',
        '• *Inversión:* Solo $20.000 COP por pauta.',
        '',
        '🎯 *¿Por qué funciona?*',
        '- Llegamos exactamente al público que puede caminar o pedir domicilio a tu local.',
        '- Resultados inmediatos con una inversión súper baja.',
        '',
        '📌 *Horario permitido de envío:*',
        '- *Lunes a viernes:* 8:00 AM a 6:00 PM',
        '- *Sábado:* 9:00 AM a 2:00 PM',
        '',
        '¿Estás seguro de la compra del *Plan LITE*?',
        'Responde *Si* para continuar y ser transferido a un asesor.',
        'Recuerda: escribe *Volver* para regresar al menú o *Salir* para terminar.'
    ], null, null, [flujoTransferenciaAsesor, flujoSalir])

const flujoPlanSmart = addKeyword(['2', 'smart', 'plan smart'])
    .addAnswer([
        '¡Perfecto! Has seleccionado 🤩 *Plan SMART*:',
        '- *Contactos alcanzados:* 500',
        '- *Tamaño de mensaje:* 160 caracteres',
        '- *Precio por pauta:* *$50.000 COP*',
        '',
        '🔥 *¡Multiplica tus ventas locales y domina tu zona!*',
        'El *Plan SMART* está diseñado para darle un impulso real a tu establecimiento llevando tu mensaje directamente al celular de los clientes de tu localidad.',
        '',
        '📲 *PLAN SMART (El favorito para acelerar ventas)*',
        '• *Alcance:* 500 contactos directos en tu localidad.',
        '• *Mensaje:* 160 caracteres.',
        '• *Inversión:* Solo $50.000 COP por pauta.',
        '',
        '📌 *Horario permitido de envío:*',
        '- *Lunes a viernes:* 8:00 AM a 6:00 PM',
        '- *Sábado:* 9:00 AM a 2:00 PM',
        '',
        '¿Estás seguro de la compra del *Plan SMART*?',
        'Responde *Si* para continuar y ser transferido a un asesor.',
        'Recuerda: escribe *Volver* para regresar al menú o *Salir* para terminar.'
    ], null, null, [flujoTransferenciaAsesor, flujoSalir])

const flujoPlanSmartPro = addKeyword(['3', 'smart pro', 'pro', 'plan smart pro'])
    .addAnswer([
        '¡Perfecto! Has seleccionado 🥳 *Plan SMART PRO (Recomendado)*:',
        '- *Contactos alcanzados:* 500',
        '- *Tamaño de mensaje:* 320 caracteres',
        '- *Precio por pauta:* *$70.000 COP*',
        '',
        '👑 *¡El paquete perfecto para convencer, enamorar y vender!*',
        'Te da el doble de espacio para comunicar todo de tu marca sin dejar nada por fuera.',
        '',
        '📲 *Plan SMART PRO ⭐ (El más recomendado)*',
        '• *Alcance:* 500 contactos directos.',
        '• *Tamaño de mensaje:* 320 caracteres.',
        '• *Inversión:* $70.000 COP por pauta.',
        '',
        '📌 *Horario permitido de envío:*',
        '- *Lunes a viernes:* 8:00 AM a 6:00 PM',
        '- *Sábado:* 9:00 AM a 2:00 PM',
        '',
        '¿Estás seguro de la compra del *Plan SMART PRO*?',
        'Responde *Si* para continuar y ser transferido a un asesor.',
        'Recuerda: escribe *Volver* para regresar al menú o *Salir* para terminar.'
    ], null, null, [flujoTransferenciaAsesor, flujoSalir])

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
    
    // REGISTRO GLOBAL DE FLUJOS: Todos los flujos principales deben estar aquí.
    const adapterFlow = createFlow([
        flujoBienvenida, 
        flujoPlanLite, 
        flujoPlanSmart, 
        flujoPlanSmartPro, 
        flujoTransferenciaAsesor, 
        flujoAsesorDirecto, 
        flujoSalir
    ])
    
    const adapterProvider = createProvider(BaileysProvider)

    const botInstance = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    // Servidor HTTP para Render/cPanel y renderización de QR
    if (adapterProvider.initHttpServer) {
        const port = process.env.PORT || 10000
        adapterProvider.initHttpServer(port)

        // Ruta de salud de la aplicación
        adapterProvider.server.get('/', (req, res) => {
            res.send('ES Comercial Bot Activo')
        })

        // Ruta opcional para escanear QR desde navegador si la consola no soporta imágenes
        adapterProvider.server.get('/qr', async (req, res) => {
            const qrPath = `${process.cwd()}/bot.qr.png`
            try {
                res.sendFile(qrPath)
            } catch (error) {
                res.send('Código QR no generado aún o dispositivo ya vinculado.')
            }
        })
    }
}

main()
