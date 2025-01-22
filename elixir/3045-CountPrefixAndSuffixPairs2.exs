defmodule MyTrie do
  def new, do: Map.new()

  def insert(map, []) do
    thisCount = Map.get(map, :count, 0)
    map = Map.put(map, :count, thisCount + 1)
    {map, thisCount}
  end

  def insert(map, [head | rest]) do
    thisCount = Map.get(map, :count, 0)
    map = Map.put_new(map, head, Map.new())
    {child, childCount} = insert(map[head], rest)
    map = Map.put(map, head, child)
    {map, thisCount + childCount}
  end
end

defmodule Solution do
  @spec count_prefix_suffix_pairs(words :: [String.t()]) :: integer
  def count_prefix_suffix_pairs(words) do
    trie = MyTrie.new()

    words
    |> Enum.reduce({trie, 0}, fn word, {cTrie, cCount} ->
      chars = word |> String.to_charlist()
      srahc = word |> String.reverse() |> String.to_charlist()
      tuples = Enum.zip(chars,srahc)
      {iTrie, iCount} = MyTrie.insert(cTrie, tuples)
      {iTrie, iCount + cCount}
    end)
    |> elem(1)
  end
end

ExUnit.start()

defmodule LeetTest do
  {_, largeInput1} = Code.eval_file("./3045-LargeInput1.exs")

  use ExUnit.Case,
    parameterize: [
      %{words: ["aba", "abababa"], output: 1},
      %{words: ["a", "aba", "ababa", "aa"], output: 4},
      %{words: ["abab", "ab"], output: 0},
      %{words: ["pa", "papa", "ma", "mama"], output: 2},
      %{words: largeInput1[:words], output: largeInput1[:output]}
    ]

  test "leet", %{words: words, output: output} do
    assert Solution.count_prefix_suffix_pairs(words) == output
  end
end
