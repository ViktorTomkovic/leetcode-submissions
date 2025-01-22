defmodule Solution do
  @spec num_ways(words :: [String.t()], target :: String.t()) :: integer
  def num_ways(words, target) do
    frequencies =
      words
      |> Enum.map(&String.to_charlist/1)
      |> Enum.zip_with(&Function.identity/1)
      |> Enum.map(&Enum.frequencies/1)

    lenFrequencies = length(frequencies)

    target
    |> String.to_charlist()
    |> Enum.reduce(
      {0, List.duplicate(1, lenFrequencies + 1)},
      fn targetLetter, {_shorterFullCount, shorterWordCount} ->
        result = dp(frequencies, shorterWordCount, [0], targetLetter)
        result
      end
    )
    |> elem(0)
  end

  def dp([], _, reversedResult, _) do
    lastElem = hd(reversedResult)
    result = reversedResult |> Enum.reverse()
    # IO.inspect({lastElem, result})
    {lastElem, result}
  end

  def dp([fr | restFr], [shorterHead | shorterWordCount], reversedResult, targetLetter) do
    countWithoutUsingThisLetter = hd(reversedResult)
    countUsingThisLetter = Map.get(fr, targetLetter, 0) * shorterHead
    allCount = Integer.mod(countWithoutUsingThisLetter + countUsingThisLetter, 1_000_000_007)
    dp(restFr, shorterWordCount, [allCount | reversedResult], targetLetter)
  end
end

words = ["acca", "bbbb", "caca"]
target = "aba"
IO.inspect(Solution.num_ways(words, target), charlists: :as_lists)

words = ["abba", "baab"]
target = "bab"
IO.inspect(Solution.num_ways(words, target), charlists: :as_lists)

