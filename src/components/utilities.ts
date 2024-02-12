import {useRouter} from "vue-router";
import axios from "axios";

// const router = useRouter();

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL

});
export const apiURL = import.meta.env.VITE_API_URL

export async function getUserInfo() {
    let data
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('Utente non oggato！');
            return;
        }
        const response = await apiClient.get('/social/user_detail', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        data = response.data
        return data
    } catch (error) {
        console.log(error)
    }
}


export async function fetchCreditAvailable() {
    try {
        const userInfo = await getUserInfo();
        const creditAvailable = userInfo.user.creditAvailable;
        console.log('Credit Available:', creditAvailable);

        return creditAvailable
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

export async function useCredit(credit: number) {
    try {
        const token = localStorage.getItem('token');
        const res = await apiClient.patch('/social/updateCredit',
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
        const res = await apiClient.patch('/social/updateCredit',
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
        apiClient.get('/social/user_detail', {
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

export async function getSqueals(limit: number, skip: number) {
    try {
        const token = localStorage.getItem('token');
        const response = await apiClient.get("/social/get_all_squeals", {
            params: {
                limit: limit,
                skip: skip
            },
            headers: {
                'Authorization': token ? `Bearer ${token}` : undefined
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
        const response = await apiClient.get(`/social/channelsUser${typeOfChannel}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                type: typeOfChannel
            }

        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export async function getSingleSquealInfo(id: string) {
    try {
        const response = await apiClient.get("/social/singleSqueal", {
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
        const res = await apiClient.patch('/social/likeSqueal',
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

export async function dislike(obj_id: string) {
    try {
        const token = localStorage.getItem('token');
        const res = await apiClient.patch('/social/dislikeSqueal',
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
        const res = await apiClient.post('/social/update_view',
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
        const res = await apiClient.get('/social/get_views',
            {
                params: {id: squealID},
            })

        console.log(res.data)
        return res.data
    } catch (error) {

    }
}

export async function MsgAutmatic_currentLocation() {
    const token = localStorage.getItem('token');
    let currentPosition
    if (navigator.geolocation) {
        setInterval(() => {

            navigator.geolocation.getCurrentPosition(
                position => {
                    currentPosition = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    const data = new FormData()
                    let newDate = new Date()
                    data.append('longitude', String(currentPosition.longitude))
                    data.append('latitude', String(currentPosition.latitude))
                    data.append('body', `Ciao a tutti, ho publiccato la mia nuova posizione in data ${newDate}`);
                    data.append('channel', '§geo');
                    data.append('automaticMessage', String(true));
                    console.log(data)

                    apiClient.post('/social/squeal_post/', data, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(response => {
                            console.log("Response: ", response.data)
                        })
                        .catch(error => {
                            console.error("Error:", error);
                        })
                },
                (error) => {
                    console.log('Error getting device location:', error)
                }
            )
        }, 6000)
    } else {
        console.log("Geolocation is not supported by this browser")
    }

}

export async function reply(text: string, replyTo: string, id: string) {

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('text', text);
    formData.append('replyTo', replyTo);
    formData.append('id', id);
    await apiClient.post('/social/squeal_reply', formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log("Response: ", response.data)

            // window.location.reload()
        })
        .catch(error => {
            console.error("Error:", error);
        })

}

export async function reply_get(squealID: string) {
    try {
        const res = await apiClient.get('/social/reply_get/', {
            params: {id: squealID},

        })
        return res.data
    } catch (error) {
        console.log(error)
    }

}

export async function get_avatar(userID: string) {
    try {
        const res = await apiClient.get('/social/get_avatar', {
            params: {user: userID}
        })
        return res

    } catch (error) {
        console.log(error)
    }
}

export async function subscribeToChannel(channelID: string) {
    const token = localStorage.getItem('token');

    try {
        const res = await apiClient.patch('/social/subscribeToChannel',
            {
                id: channelID
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }

            })
        return res
    } catch (error) {
        console.log(error)
    }
}

export async function unsubscribeToChannel(channelID: string) {
    const token = localStorage.getItem('token');

    try {
        const res = await apiClient.patch('/social/unsubscribeToChannel',
            {
                id: channelID
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }

            })
        return res
    } catch (error) {
        console.log(error)
    }
}

export async function MyGeoSqueals() {
    const token = localStorage.getItem('token');
    try {
        return await apiClient.get('/social/get_geoSqueals', {
            headers: {
                'Authorization': `Bearer ${token}`

            }
        })
    } catch (error) {
        console.log(error)
    }
}

export async function search(word: string) {
    try {
        const res = await apiClient.get('/social/search_squeal',
            {
                params: {word: word},
            })

        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function removeSMM() {
    const token = localStorage.getItem('token');

    try {
        const res = await apiClient.post('/social/removeSMM',{},{
            headers: {
                'Authorization': `Bearer ${token}`

            }
        })

        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function create_channel(name: string, description: string) {
    const token = localStorage.getItem('token');

    try {
        const res = await apiClient.post('/social/createCh',{
            name: '§'+name,
            desc: description,
            typeOf: 'private'
        },{
            headers: {
                'Authorization': `Bearer ${token}`

            }
        })

        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
