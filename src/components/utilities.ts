import axios from "axios";
import {useRouter} from "vue-router";

// const router = useRouter();


export async function getUserInfo() {
    let data
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

export async function useCredit(credit: number) {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.patch('http://localhost:3000/social/updateCredit',
            {value: credit}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}

export async function topUp(amount: number) {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.patch('http://localhost:3000/social/updateCredit',
            {
                value: amount,

            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

        console.log(res.data)
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

export async function getSqueals() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:3000/social/get_all_squeals", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// typeOfChannel: insert O for official, P for private
export async function getChannels(typeOfChannel: string) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/social/allChannel${typeOfChannel}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function getSingleSquealInfo(id: string) {
    try {
        const response = await axios.get("http://localhost:3000/social/singleSqueal", {
            params: {id: id}
        })
        return response.data
    } catch (error) {
        console.log(error)
    }

}

export async function like(obj_id: string) {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.patch('http://localhost:3000/social/likeSqueal',
            {
                id: obj_id,

            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })

        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(obj_id)
        console.log(error)
    }
}

export async function squealView(squealID: string) {
    try {
        const res = await axios.post('http://localhost:3000/social/update_view',
            {
                id: squealID,
            })

        console.log(res.data)
        return res.data
    } catch (error) {

    }
}

export async function squealViewCount(squealID: string) {
    try {
        const res = await axios.get('http://localhost:3000/social/get_views',
            {
                params: {id: squealID},
            })

        console.log(res.data)
        return res.data
    } catch (error) {

    }
}