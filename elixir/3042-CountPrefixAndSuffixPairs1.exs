defmodule Solution do
  @spec count_prefix_suffix_pairs(words :: [String.t()]) :: integer
  def count_prefix_suffix_pairs(words) do
    words
    |> asdf()
  end

  def asdf(post, count \\ 0)
  def asdf([], count), do: count

  def asdf([head | post], count) do
    count =
      count +
        (post
         |> Enum.count(fn word ->
           String.starts_with?(word, head) && String.ends_with?(word, head)
         end))

    asdf(post, count)
  end
end

ExUnit.start()

defmodule LeetTest do
  use ExUnit.Case,
    parameterize: [
      %{words: ["aba", "abababa"], output: 1},
      %{words: ["a", "aba", "ababa", "aa"], output: 4},
      %{words: ["abab", "ab"], output: 0},
      %{words: ["pa", "papa", "ma", "mama"], output: 2}
    ]

  test "leet", %{words: words, output: output} do
    assert Solution.count_prefix_suffix_pairs(words) == output
  end
end
