export const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en-AU", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date);

};