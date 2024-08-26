const generateUniqueId = (): string  => {
    const timestamp = Date.now().toString(24);
    
    const randomStr = Math.random().toString(24).substring(2, 10);
    
    return `${timestamp}${randomStr}`;
}

export default generateUniqueId;