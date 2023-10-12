import { expect, test } from 'vitest'
import { Slug } from './slug'

test('create an slug', async () => {
    const slug = Slug.createFromText('This Is- the_ Slug @')

    expect(slug.value).toEqual('this-is-the-slug')
})
