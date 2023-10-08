import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

export async function getUserInfo(data) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('Utente non oggato！');
            return;
        }
        const response = await axios.get('http://localhost:3000/social/user_detail', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        data = response.data
        return data.user
    } catch (error) {
        console.log(error)
    }
}


export async function logout() {
    const router = useRouter();
    const token = localStorage.getItem('token');
    if (token) {
        localStorage.removeItem('token');

    }
    await router.push('/')
    window.location.reload();

    console.log(token)
    console.log("logged out");
}

export function checkLoginStatus() {
    const token = localStorage.getItem('token');
    if (token) {
        axios.get('http://localhost:3000/social/user_detail', {
            headers: {
                'Authorization': `Bearer ${token}`

            }
        })
            .then(response => {
                console.log("Utente loggato", response.data)
            })
            .catch(error => {
                console.log("Utente non loggato o scaduto", error)
            })
    } else {
        console.log("Utente non loggato")
    }
}

