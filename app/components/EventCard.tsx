interface EventCardProps {
    title: string;
    description: string;
    start_date: string;
    // venue_name:string;
}

export default function EventCard({title,description,start_date}: EventCardProps) {
    return(
        <div className="w-full flex flex-col border-b-2 bg-primary text-primary-foreground rounded-lg p-5 gap-4">
            <div className="font-bold text-xl">{title}</div>
            <div>{start_date}</div>
            <p>{description}</p>
        </div>
    )
}