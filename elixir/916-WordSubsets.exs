defmodule Solution do
  @spec word_subsets(words1 :: [String.t()], words2 :: [String.t()]) :: [String.t()]
  def word_subsets(words1, words2) do
    # alpha = "abcdefghijklmnopqrstuvwxyz" |> String.to_charlist()
    #
    # zeroMap =
    #   alpha
    #   |> Map.new(&{&1, 0})
    letterMap =
      words2
      |> Enum.reduce(Map.new(), fn word, letterMap ->
        word
        |> String.to_charlist()
        |> Enum.frequencies()
        |> Map.merge(letterMap, fn _, v1, v2 -> max(v1, v2) end)
      end)

    words1
    |> Enum.filter(fn word ->
      letterWordMap =
        word
        |> String.to_charlist()
        |> Enum.frequencies()

      letterMap
      |> Enum.all?(fn {letter, frequency} -> frequency <= letterWordMap |> Map.get(letter, 0) end)
    end)
  end
end

ExUnit.start()

defmodule LeetTest do
  # {_, largeInput1} = Code.eval_file("./3045-LargeInput1.exs")

  use ExUnit.Case,
    async: true,
    parameterize: [
      %{
        words1: ["amazon", "apple", "facebook", "google", "leetcode"],
        words2: ["e", "o"],
        output: ["facebook", "google", "leetcode"]
      },
      %{
        words1: ["amazon", "apple", "facebook", "google", "leetcode"],
        words2: ["l", "e"],
        output: ["apple", "google", "leetcode"]
      },
      %{words1: ["warrior", "raw", "rraw"], words2: ["wr", "wrr"], output: ["warrior", "rraw"]}
      # %{words: largeInput1[:words], output: largeInput1[:output]}
    ]

  test "leet", %{words1: words1, words2: words2, output: output} do
    solution = Solution.word_subsets(words1, words2)

    assert Enum.sort(solution) == Enum.sort(output)
  end
end
