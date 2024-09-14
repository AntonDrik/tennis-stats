const mapToArray = <K, V>(map: Map<K, V> | Omit<Map<K, V>, 'set' | 'clear' | 'delete'>): V[] => {
    if (!map) {
        return [];
    }
    
    return Array.from(map.values());
};

export default mapToArray;
