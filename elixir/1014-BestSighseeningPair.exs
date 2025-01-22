defmodule Solution do
  @spec max_score_sightseeing_pair(values :: [integer]) :: integer
  def max_score_sightseeing_pair(values) do
    attempt2(values)
  end

  def maxUntil([h]) do
    [h]
  end

  def maxUntil([h | t]) do
    m = maxUntil(t)
    [max(h, hd(m)) | m]
  end

  def attempt2(values) do
    len = length(values)

    [plus, minus] =
      Enum.to_list(0..(len - 1))
      |> Enum.zip_reduce(values, [[], []], fn e1, e2, [plus, minus] ->
        [[e2 + e1 | plus], [e2 - e1 | minus]]
      end)

    # |> then(fn [plus, minus] -> 
    p1 = tl(List.foldr(plus, [], &drdr(&1, &2)))
    m1 = minus |> :lists.reverse() |> tl() |> List.foldr([], &drdr/2) |> :lists.reverse()
    IO.inspect(p1, charlists: :as_lists)
    IO.inspect(m1, charlists: :as_lists)
    Enum.zip_reduce(p1, m1, 0, fn e1, e2, acc -> max(acc, e1 + e2) end)
  end

  def drdr(e, []) do
    [e]
  end

  def drdr(e, a) do
    [max(e, hd(a)) | a]
  end

  def attempt1(values) do
    len = length(values)

    [plus, minus] =
      Enum.to_list(0..(len - 1))
      |> Enum.zip_reduce(values, [[], []], fn e1, e2, [plus, minus] ->
        [[[e1, e2 + e1] | plus], [[e1, e2 - e1] | minus]]
      end)

    for [iP, vP] <- plus, [iM, vM] when iM > iP <- minus, reduce: 0 do
      currentMax -> max(vP + vM, currentMax)
    end
  end
end

values = [8, 1, 5, 2, 6]
# Output: 11
IO.inspect(Solution.max_score_sightseeing_pair(values), charlists: :as_lists)
values = [1, 2]
# Output: 2
IO.inspect(Solution.max_score_sightseeing_pair(values), charlists: :as_lists)

values = [1, 1, 1, 1, 1, 1, 1, 1]
# Output: 2
IO.inspect(Solution.max_score_sightseeing_pair(values), charlists: :as_lists)
