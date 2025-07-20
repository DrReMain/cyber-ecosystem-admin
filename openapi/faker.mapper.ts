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

    access_token: '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXBhcnRtZW50SUQiOiIiLCJleHAiOjE3NTMwNjI0ODQsImlhdCI6MTc1Mjk3NjA4NCwicG9zaXRpb25JRCI6IiIsInJvbGVDb2RlIjoiU1VQRVIiLCJ1c2VySUQiOiJkMDI1YXQ5c2liZnM3M2FmODhhZyJ9.eBSWn93KQORz14qzZuhwqycLo-o7l9Z8tgdRMMPhOTM"',
    access_expire: '4102444800000',
    refresh_token: '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXBhcnRtZW50SUQiOiIiLCJleHAiOjE3NTMwNjI0ODQsImlhdCI6MTc1Mjk3NjA4NCwicG9zaXRpb25JRCI6IiIsInJvbGVDb2RlIjoiU1VQRVIiLCJ1c2VySUQiOiJkMDI1YXQ5c2liZnM3M2FmODhhZyJ9.eBSWn93KQORz14qzZuhwqycLo-o7l9Z8tgdRMMPhOTM"',
    refresh_expire: '4102444800000'
}
