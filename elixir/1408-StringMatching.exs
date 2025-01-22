defmodule Solution do
  @spec string_matching(words :: [String.t()]) :: [String.t()]
  def string_matching(words) do
    result =
      words
      |> Enum.reduce([], fn pattern, acc ->
        if Enum.any?(words, fn word -> (pattern != word) && (word =~ pattern) end) do
          [pattern | acc]
        else
          acc
        end
      end)

    result |> Enum.reverse()
  end
end

ExUnit.start()

defmodule LeetTest do
  use ExUnit.Case,
    async: true,
    parameterize: [
      %{words: ["mass", "as", "hero", "superhero"], output: ["as", "hero"]},
      %{words: ["leetcode", "et", "code"], output: ["et", "code"]},
      %{words: ["blue", "green", "bu"], output: []}
    ]

  test "leet", %{words: words, output: output} do
    assert Solution.string_matching(words) == output
  end
end
