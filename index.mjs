#!/usr/bin/env zx

const data = await fetch('https://api.github.com/users/houhoz/repos')
const urls = await data.json()
const repos = urls
  .filter(info => {
    return !info.fork
  })
  .map(info => info.git_url)

await $`mkdir backups`
cd('./backups')
Promise.all(
  repos.map(url => {
    return $`git clone ${url}`
  })
)

console.log(`repos`, repos)
