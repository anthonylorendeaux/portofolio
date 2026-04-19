/**
 * Composable pour générer un schema FAQPage JSON-LD
 * Utilisé sur les pages avec une FAQ
 * @param items - Tableau de questions/réponses {label: string, content: string}
 */
export const useJsonLdFaqPage = (
  items: Array<{ label: string; content: string }>
) => {
  if (!items || items.length === 0) return

  const script = computed(() => {
    return {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item: { label: string; content: string }) => ({
          '@type': 'Question',
          name: item.label,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.content,
          },
        })),
      }),
    }
  })

  useHead({
    script: [script],
  })
}
