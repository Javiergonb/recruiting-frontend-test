const Table = (props) => {
    const usdToPeso = 946.94

    return (
        <div className="table-container">
            <table>
                <tbody>
                    {props.facturas.map(factura => {
                        const amountCLP = factura.currency === 'USD'
                            ? factura.amount * usdToPeso
                            : factura.amount;

                        const amountUSD = factura.currency === 'CLP'
                            ? (factura.amount / usdToPeso).toFixed(2)
                            : factura.amount;

                        return (
                            <tr key={factura.id}>
                                <td><button onClick={() => props.handleSelect(factura.id)}>selecionar</button></td>
                                <td>{factura.id} ({factura.organization_id})</td>
                                <td>${amountCLP} CLP (${amountUSD} USD)</td>
                                <td>
                                    {props.showReference ? factura.reference : factura.type}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    )
}




export default Table