/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import "../App.css";
import { Configuration, OpenAIApi } from "openai";
import OptionSelection from "../components/OptionSelection";
import Translation from "../components/Translation";
import { arrayItems } from "../AIOptions";

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const history = useHistory();

    useEffect(() => {
        refreshToken();
        getUsers();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('https://api-katalismedia.vercel.app/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history.push("/");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('https://api-katalismedia.vercel.app/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getUsers = async () => {
        const response = await axiosJWT.get('https://api-katalismedia.vercel.app/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }

    const configuration = new Configuration({
        apiKey: "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",
      });
      const openai = new OpenAIApi(configuration);
      const [option, setOption] = useState({});
      const [result, setResult] = useState("");
      const [input, setInput] = useState("");
      console.log(process.env.Open_AI_Key);
      const selectOption = (option) => {
        setOption(option);
      };
    
      const doStuff = async () => {
        let object = { ...option, prompt: input };
    
        const response = await openai.createCompletion(object);
    
        setResult(response.data.choices[0].text);
      };

    return (
        <div className="container mt-5">
            <h1 className="nama">Welcome Back: {name}</h1>
            {Object.values(option).length === 0 ? (
        <OptionSelection arrayItems={arrayItems} selectOption={selectOption} />
      ) : (
        <Translation doStuff={doStuff} setInput={setInput} result={result} />
      )}
        <a href="/" class="button is-danger is-outlined">
          <span>Sign Out</span>
        </a>
        </div>
    )
}

export default Dashboard
