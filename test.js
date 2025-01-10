// cm59el6430001m0gdwyd5jsd6 (SOFIA API KEY)
// cm59r97yz000164ln4ntjrgl0 (Abdullah API KEY)

const res = fetch("https://pingpanda-devsire.vercel.app/api/v1/events",{
    method: 'POST',
    headers: {
        Authorization: "Bearer cm58jx26i000111ms2vf5g944"
    },
    body: JSON.stringify({
        category: "bug",
        fields: {
            "App": "Visage", 
            "Issue": "Post not caching properly", 
            "Reported By": "Subhan"
        }
    })
}).then((res) => console.log(res.json())).catch((err) => console.log(err))