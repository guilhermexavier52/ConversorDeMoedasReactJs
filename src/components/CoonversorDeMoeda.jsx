import { useEffect, useState } from "react";
import '../components/ConversorDeMoedas.css';

function ConversorDeMoedas() {
    const [moedas, setMoedas] = useState([]);
    const [deMoeda, setDeMoeda] = useState('USD');
    const [paraMoeda, setParaMoeda] = useState('EUR');
    const [quantidade, setQuantidade] = useState(1);
    const [resultado, setResultado] = useState(0);

    useEffect(() => {
        fetch('https://api.exchangerate-api.com/v4/latest/USD') // URL atualizada
            .then(response => response.json())
            .then(data => {
                setMoedas([...Object.keys(data.rates)]);
            })
            .catch(error => console.error('Erro ao buscar moedas:', error));
    }, []);

    const converterMoeda = () => {
        fetch(`https://api.exchangerate-api.com/v4/latest/${deMoeda}`) // URL atualizada
            .then(response => response.json())
            .then(data => {
                const taxaDeCambio = data.rates[paraMoeda];
                setResultado((quantidade * taxaDeCambio).toFixed(2)); // Convertendo para 2 casas decimais
            })
            .catch(error => console.error('Erro ao converter moeda:', error));
    };

    return (
        <div>
            <h2>Conversor de Moedas</h2>
            <section>
            <div>
                <label>De:</label>
                <select value={deMoeda} onChange={(e) => setDeMoeda(e.target.value)}>
                    {moedas.map(moeda => (
                        <option key={moeda} value={moeda}>{moeda}</option>
                    ))}
                </select>
                <input
                    type="number"
                    value={quantidade}
                    onChange={(e) => setQuantidade(Number(e.target.value))} // Garantindo que seja número
                    min="1"
                />
            </div>
            <div>
                <label>Para:</label>
                <select value={paraMoeda} onChange={(e) => setParaMoeda(e.target.value)}>
                    {moedas.map(moeda => (
                        <option key={moeda} value={moeda}>{moeda}</option>
                    ))}
                </select>
                <button onClick={converterMoeda}>Converter</button>
            </div>
            <div>
                <h3>Resultado:</h3>
                <p>{resultado}</p>
            </div>
            </section>
        </div>
        
    );
}

export default ConversorDeMoedas;