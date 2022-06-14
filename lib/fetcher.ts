export default async (url: string, data: any) => {
    return fetch(`${window.location.origin}/api/${url}`, {
        method: data? "POST" : "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => {
        if(200 > res.status && res.status >= 300){
            throw new Error()
        }
        res.json()
    });
}