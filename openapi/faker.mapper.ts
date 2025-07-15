export const mapper = {
    t: 'faker.date.recent().getTime().toString()',
    success: 'faker.datatype.boolean(1)',
    code: '"000000"',
    msg: '"OK"',
    page_no: '1',
    page_size: '10',
    total: '12',
    more: 'true',

    // Avoid recursion
    // components.schemas.departmentRes.properties.children
    children: '[]',

    id: 'faker.string.numeric(20)',
    email: 'faker.internet.email()',
    phone: '"18688886666"',
    avatar: 'faker.image.avatar()',
}
