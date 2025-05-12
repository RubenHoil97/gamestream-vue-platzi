import { onMounted, reactive } from "vue"

export function useFetch(apiUrl = '', onSuccess = () => { }) {
  const state = reactive({
    error: null,
    isLoading: false,
    data: [],
  })

  const fetchGames = async () => {
    try {
      state.isLoading = true
      const respose = await fetch(apiUrl)
      const json = await respose.json()
      state.data = json
      onSuccess(json)
    } catch (error) {
      console.error('Error fetching games:', error)
      state.error = error
    } finally {
      state.isLoading = false
    }
  }

  onMounted(() => {
    fetchGames()
  })

  return { state }
}
