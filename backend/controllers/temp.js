const itemObject = [
    {
        name: 'dagon_5',
        components: [
            {
                name: 'dagon_4',
                components: [
                    {
                        name: 'dagon_3',
                        components: [
                            {
                                name: 'dagon_2',
                                components: [
                                    {
                                        name: 'dagon_recipe',
                                        components: [
                                            {
                                                name: 'null_talisman',
                                                components: [
                                                    {
                                                        name: 'mantle',
                                                        components: [],
                                                    },
                                                    {
                                                        name: 'circlet',
                                                        components: [],
                                                    },
                                                ],
                                            },
                                            {
                                                name: 'staff_of_wizardry',
                                                components: [],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: 'lame',
        components: [],
    },
    {
        name: 'dagon_recipe',
        components: [
            {
                name: 'dagon_recipe',
                components: [
                    {
                        name: 'null_talisman',
                        components: [
                            {
                                name: 'mantle',
                                components: [],
                            },
                            {
                                name: 'circlet',
                                components: [],
                            },
                        ],
                    },
                    {
                        name: 'staff_of_wizardry',
                        components: [],
                    },
                ],
            },
        ],
    },
];

function getComponentAsArray(item) {
    // no item, no array
    if (!item) {
        return [];
    }
    // base case, has no components
    if (!item.components) {
        return [item.name];
    }
    const components = [];
    item.components.forEach((element) => {
        const arr = getComponentAsArray(element);
        arr.forEach((tempElement) => {
            components.push(tempElement);
        });
    });
    components.push(item.name);
    return components;
}

function generateItemCode(itemsArray) {
    // const arr = [];
    let arr = [];
    for (let i = 0; i < itemsArray.length; i += 1) {
        const items = getComponentAsArray(itemsArray[i]);
        // fancy way to join arrays
        arr = items.reduce((col, item) => {
            col.push(item);
            return col;
        }, arr);
    }
    return arr;
}

// generateItemCode(itemObject);

const level1 = [
    {
        name: 'null_talisman',
        components: [
            {
                name: 'mantle',
                components: [],
            },
            {
                name: 'circlet',
                components: [],
            },
        ],
    },
];

const level2 = [{
    name: 'dagon_recipe',
    components: [
        {
            name: 'dagon_recipe',
            components: [
                {
                    name: 'null_talisman',
                    components: [
                        {
                            name: 'mantle',
                            components: [],
                        },
                        {
                            name: 'circlet',
                            components: [],
                        },
                    ],
                },
                {
                    name: 'staff_of_wizardry',
                    components: [],
                },
            ],
        },
    ],
}];

// console.log('level1');
// generateItemCode(level1);
// console.log('level1');
// console.log('level2');
// generateItemCode(level2);
// console.log('level2');
console.log('max');
console.log(generateItemCode(itemObject));

console.log('max');

