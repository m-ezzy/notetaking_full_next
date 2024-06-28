// import Cookies from "js-cookie";

const makeRequest = async (route: String, body: any) => {
	console.log('makeRequest', route, body);

	const response: any = await fetch("http://localhost:3000" + route, {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': Cookies.get('csrftoken'),   //document.cookie.split(';').find(el => el.split('=')[0] == 'csrftoken').split('=')[1]
		},
		body: body ? JSON.stringify(body) : null
	})
	.catch(err => console.log(err));

	const data: any = await response.json()
	.catch(err => console.log(err));

	console.log('makeRequest', data);
	return data;
}

export default makeRequest;
