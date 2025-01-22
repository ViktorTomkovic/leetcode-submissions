defmodule Solution do
  @spec vowel_strings(words :: [String.t()], queries :: [[integer]]) :: [integer]
  def vowel_strings(words, queries) do
    vowels = ["a", "e", "i", "o", "u"]

    map =
      words
      |> Enum.map(&(String.starts_with?(&1, vowels) && String.ends_with?(&1, vowels)))
      |> Enum.reduce([0], fn e, a -> [hd(a) + ((e && 1) || 0) | a] end)
      |> Enum.zip((length(words) - 1)..-1//-1)
      |> Map.new(fn {f, l} -> {l, f} end)

    queries
    |> Enum.reduce([], fn [l, r], a -> [Map.get(map, r) - Map.get(map, l - 1) | a] end)
    |> Enum.reverse()
  end
end

words = ["aba", "bcb", "ece", "aa", "e"]
queries = [[0, 2], [1, 4], [1, 1]]
# Output: [2,3,0]
IO.inspect(Solution.vowel_strings(words, queries))

words = ["a", "e", "i"]
queries = [[0, 2], [0, 1], [2, 2]]
# Output: [3,2,1]
IO.inspect(Solution.vowel_strings(words, queries))
