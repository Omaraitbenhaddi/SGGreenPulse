import axios from 'axios';
import { useState, useEffect } from 'react';

export async function fetchAllDomains(setDomains,setError) {
  try {
    console.log(`${import.meta.env.VITE_API_URL}all/`);
    const response = await axios.get(`${import.meta.env.VITE_API_URL}all/`);
    setDomains(response.data);
  } catch (error) {
    console.error('Error fetching domains:', error);
    setError("Error de connexion")
  }
};


export const runPlaybook = async (playbookPath, variables, selectedDomain, vaultPass = "") => {
  const payload = {
    playbook_path: playbookPath,
    vaultPass,
    selectedDomain,
    variables: variables.reduce((acc, variable) => {
      acc[variable.name] = variable.value;
      return acc;
    }, {}),
  };

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/run-playbook/`, payload, {
      headers: {
        'Authorization': 'Token e84f889bba29bb12beb3d4607704174c789345f9',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};


export const fetchVariables = async (domainKey, title) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}api/get_variables/${domainKey}/${title.slice(0, -4)}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching variables:', error);
    return {};
  }
}



export const fetchLogs = async (setLogs, state,setError) => {
  if (state && state.playbook_name && state.created_at) {
      try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}logsByName/`, {
              created_at: state.created_at,
              playbook_name: state.playbook_name
          }, {
              headers: {
                  'Authorization': `Token e84f889bba29bb12beb3d4607704174c789345f9`
              }
          });
          setLogs(response.data.output); 
      } catch (error) {
        setError("Error de connexion Error fetching logs")
          console.error('Error fetching logs:', error);
      }
  }
};


export const fetchLog = async (id,setlongeur,setUsers,setError) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}logs/?page=${id + 1}`, {
      headers: {
        'Authorization': 'Token e84f889bba29bb12beb3d4607704174c789345f9',
      },
    });
    setUsers(prev => Array.isArray(response.data.results) ? [...prev, ...response.data.results] : prev);
    setlongeur(response.data.count)
  } catch (error) {
    console.error('Error fetching logs:', error);
    setUsers([]);
    setError("Error de connexion Error fetching logs")
  }
};



export const useFetchData = (url, initialState = []) => {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}${url}`, {
          headers: {
            'Authorization': `Token e84f889bba29bb12beb3d4607704174c789345f9`,
          },
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [url]);

  return { data, error };
};

