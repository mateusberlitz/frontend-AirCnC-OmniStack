import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import './style.css';
import camera from '../../assets/camera.svg';

function New({ history }){
    const [thumbnail, setThumbnail] = useState('');
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    async function handleSubmit(event){
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        });

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label id="thumbnail" style={{ backgroundImage: `url(${preview})`}} className={thumbnail ? 'has-thumbnail' : ''}>
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Selecione uma imagem"/>
            </label>
            
            <label htmlFor="company">Empresa *</label>
            <input 
                type="text" 
                id="company" 
                placeholder="Sua empresa incrível" 
                value={company} 
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="techs">Tecnologias * <span>(Separados por Vírgula)</span></label>
            <input 
                type="text" 
                id="techs" 
                placeholder="Quais tecnologias usam?" 
                value={techs} 
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="price">Valor da Diária * <span>(Em branco para Gratuito)</span></label>
            <input 
                type="text" 
                id="price" 
                placeholder="R$ 0,00" 
                value={price} 
                onChange={event => setPrice(event.target.value)}
            />

            <button className="btn" type="submit">Cadastrar</button>
        </form>
    )
}

export default New;