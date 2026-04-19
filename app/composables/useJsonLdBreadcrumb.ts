/**
 * Composable pour générer un schema BreadcrumbList JSON-LD
 * Utilisé sur les pages hors homepage
 */
export const useJsonLdBreadcrumb = (breadcrumbs: Array<{ name: string; path: string }>) => {
  const baseUrl = 'https://anthony-lorendeaux.com'

  const script = computed(() => {
    return {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${baseUrl}${item.path}`,
        })),
      }),
    }
  })

  useHead({
    script: [script],
  })
}
