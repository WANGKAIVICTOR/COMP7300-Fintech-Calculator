import React, {useState, useEffect} from "react";
import '../App.css';
import {useNavigate} from "react-router-dom";
import {Bar} from '@ant-design/plots';

function BarChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/data_explore', {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(resp => resp.json())
            .then(resp => setData(resp['data']))
            .catch(error => console.log(error))
    }, [])

    const config = {
        data,
        xField: 'value',
        yField: 'name',
        marginRatio: 0,
        // scrollbar: {
        //     type: 'vertical',
        // },
        dodgePadding: 4,
        label: {
            position: 'middle',
            offset: 20,
            style: {
                fill: 'black'
            },
        },
        barStyle: {
            radius: [2, 2, 0, 0],
        },
        style: {
            height: 200,
        },
    };


    return (
        <div>
            <Bar {...config}/>
        </div>
    )
}

export default BarChart;