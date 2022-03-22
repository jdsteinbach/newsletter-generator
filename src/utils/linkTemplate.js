export const linkTemplate = link => `
<h3>
  <a href="${link.url}">${link.title}</a>
</h3>
<p>${link.excerpt}</p>
<p>
  <a href="${link.url}">Read More&hellip;</a>
</p>`
