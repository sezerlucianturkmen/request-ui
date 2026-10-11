export const requestCategories = [
  { value: 'GENERAL', label: 'Genel' },
  { value: 'TECHNICAL', label: 'Teknik' },
  { value: 'SUPPORT', label: 'Destek' },
]

export const requestStatuses = [
  { value: 'OPEN', label: 'Açık' },
  { value: 'ANSWERED', label: 'Yanıtlandı' },
  { value: 'CLOSED', label: 'Kapatıldı' },
]

export const categoryLabels = Object.fromEntries(
  requestCategories.map(({ value, label }) => [value, label]),
)

export const statusLabels = Object.fromEntries(
  requestStatuses.map(({ value, label }) => [value, label]),
)
