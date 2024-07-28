type WeatherReport={
    tempMax: number;
    tempMin: number;
    description: string;
    location: string;
    icon: string;
}
type EventInfo={
    title:string,
    description:string,
    date:
    {
        start_date:string,
        when:string
    },
    address:string[],
    link:string,
    event_location_map:{
        image:string,
        link:string,
        serpapi_link:string
    },
    ticket_info:[
        {
            source:string,
            link:string,
            link_type:string
        }
    ],
    venue:{
        name:string,
        rating:number,
        reviews:string,
        link:string
    },
    thumbnail:string
}