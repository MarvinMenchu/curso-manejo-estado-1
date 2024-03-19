import React from "react"

function UseState({ name }) {

    const [error, setError] = React.useState(true)
    const [loagind, setLoading] = React.useState(false)

    React.useEffect(() => {
        console.log('Empezando el Efecto')
        if (!!loagind) {
            setTimeout(() => {
                console.log('Haciendo la validación')
                setLoading(false)
                console.log('Terminando la validación')
            }, 3000)
        }
        console.log('Terminando el Efecto')
    }, [loagind])

    return (
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor, escribe el código de seguridad</p>
                {error && (
                    <p>Error: el código es incorrecto</p>
                )}
                {loagind && (
                    <p>Loading...</p>
                )}
            <input placeholder="Código de seguridad" />
            <button
                onClick={() => setLoading(!loagind)}
            >Comprobar</button>
        </div>
    )
}

export { UseState }