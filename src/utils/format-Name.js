



export function formatName(name) {
    const nameWithoutSuffix = name.slice(0, -4).replace(/_/g, " ");
    const formattedName = nameWithoutSuffix.charAt(0).toUpperCase() + nameWithoutSuffix.slice(1);

    return formattedName;
}

