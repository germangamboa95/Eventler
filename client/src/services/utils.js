export default { 
    getParams: (name) => (new URL(document.location)).searchParams.get(name)
}