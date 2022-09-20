import React,{ useState, useEffect } from 'react'
import axios from 'axios'


const CSRFToken = () => {
	const [csrftoken, setcsrftoken] = useState("")
	
	const getCookie = (name) => {
	    let cookieValue = null;
	    if (document.cookie && document.cookie !== '') {
	        const cookies = document.cookie.split(';');
	        for (let i = 0; i < cookies.length; i++) {
	            const cookie = cookies[i].trim();
	            if (cookie.substring(0, name.length + 1) === (name + '=')) {
	                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                break;
	            }
	        }
	    }
	    return cookieValue;
	}
	
	useEffect(() => {
		const fetchData = async () =>{
			try{
				const res = await axios.get('http://localhost:8000/users/get-cookie')
				const { success, error } = res.data
				if(success){
					console.log(success)
				}else{
					alert(error)
				}
			}catch(err){

			}

		}
		fetchData()
		setcsrftoken(getCookie('csrftoken')) 
	}, [])

	return (
		<input type="hidden" name="csrfmiddlewaretoken" value={csrftoken}/>
	)
}

export default CSRFToken;