defmodule Solution do
  @spec max_sum_of_three_subarrays(nums :: [integer], k :: integer) :: [integer]
  def max_sum_of_three_subarrays(nums, k) do
    len = length(nums)
    numsMap = makeIndexMap(nums)

    globals = %{
      :firstSum => 0,
      :secondSum => 0,
      :thirdSum => 0,
      :len => len,
      :k => k,
      :singleMax => 0,
      :singleInd => [],
      :doubleMax => 0,
      :doubleInd => [],
      :tripleMax => 0,
      :tripleInd => []
    }

    reduce(numsMap, len, k, k, k, globals)
  end

  def makeIndexMap(list, index \\ 0, acc \\ [])

  def makeIndexMap([head | rest], index, acc),
    do: makeIndexMap(rest, index + 1, [{index, head} | acc])

  def makeIndexMap(_, _, acc), do: Map.new(acc)

  def reduce(numsMap, -1, 0, 0, 0, globals) do
    globals
  end

  def reduce(numsMap, remaining, 0, 0, 0, globals) do
    index = globals[:len] - remaining
    thirdEnd = index
    secondEnd = index - globals[:k]
    firstEnd = index - globals[:k] * 2
    thirdStart = secondEnd + 1
    secondStart = firstEnd + 1
    firstStart = index - globals[:k] * 3 + 1


    reduce(numsMap, remaining - 1, 0, 0, 0, globals)
  end

  def reduce(numsMap, remaining, 0, 0, 1, globals) do
    index = globals[:len] - remaining
    globals = globals |> Map.update!(:thirdSum, &(&1 + Map.get(numsMap, index)))
    reduce(numsMap, remaining, 0, 0, k3 - 1, globals)
  end

  def reduce(numsMap, remaining, 0, 0, k3, globals) do
    index = globals[:len] - remaining
    globals = globals |> Map.update!(:thirdSum, &(&1 + Map.get(numsMap, index)))
    reduce(numsMap, remaining - 1, 0, 0, k3 - 1, globals)
  end

  def reduce(numsMap, remaining, 0, k2, k3, globals) do
    index = globals[:len] - remaining
    globals = globals |> Map.update!(:secondSum, &(&1 + Map.get(numsMap, index)))
    reduce(numsMap, remaining - 1, 0, k2 - 1, k3, globals)
  end

  def reduce(numsMap, remaining, k1, k2, k3, globals) do
    index = globals[:len] - remaining
    globals = globals |> Map.update!(:firstSum, &(&1 + Map.get(numsMap, index)))
    reduce(numsMap, remaining - 1, k1 - 1, k2, k3, globals)
  end
end

nums = [1, 2, 1, 2, 6, 7, 5, 1]
k = 2
# Output: [0,3,5]
IO.inspect(Solution.max_sum_of_three_subarrays(nums, k), charlists: :as_lists)

# nums = [1, 2, 1, 2, 1, 2, 1, 2, 1]
# k = 2
# # Output: [0,2,4]
# IO.inspect(Solution.max_sum_of_three_subarrays(nums, k), charlists: :as_lists)

n = 2 * 10 ** 4
# n = 1000
nums = Enum.to_list(1..n) |> Enum.map(fn _x -> Enum.random(1..(2 ** 16)) end)
# target = Enum.random(1..1000)
k = :rand.uniform(floor(n / 3))
prev2 = Time.utc_now()
IO.inspect(Solution.max_sum_of_three_subarrays(nums, k), charlists: :as_lists)
next2 = Time.utc_now()
diff2 = Time.diff(next2, prev2, :millisecond)
IO.puts("Time")
IO.inspect(diff2)
