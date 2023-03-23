const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    online: {
        type: Boolean,
        default: false, 
    }
});

UsuarioSchema.method('toJSON', function(){  
    // usa desestructuracion para sacar las propiedades que no necesito 
    // despues las renombro visualmente y guardo los datos que obtengo dentro de una copia literal del objetp

    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Usuario', UsuarioSchema);