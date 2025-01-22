defmodule Solution do
  @spec max_sum_of_three_subarrays(nums :: [integer], k :: integer) :: [integer]
  def max_sum_of_three_subarrays(nums, k) do
    len = length(nums)
    globals = %{:firstStart => hd(nums), :firstSum => 0, :secondSum => 0, :thirdSum => 0}
    reduce(nums, len - k, k, k, k, globals)
  end

  def reduce([head | rest], 0, 0, 0, 0, globals) do
    globals = Map.put(globals, :init1, false)
    # globals = globals |> Map.get(:first)
    # bestTripleStart
    globals
  end

  def reduce([head | rest], remaining, 0, 0, 0, globals) do
    # globals = globals |> Map.get(:first)
    reduce(rest, remaining - 1, 0, 0, 0, globals)
  end

  def reduce([head | rest], remaining, 0, 0, k3, globals) do
    globals = globals |> Map.update!(:thirdSum, &(&1 + head))
    # globals = globals |> Map.get(:first)
    reduce(rest, remaining - 1, 0, 0, k3 - 1, globals)
  end

  def reduce([head | rest], remaining, 0, 1, k3, globals) do
    globals = globals |> Map.update!(:secondSum, &(&1 + head))
    globals = Map.put(globals, :secondEnd, head)
    globals = Map.put(globals, :thirdStart, hd(rest))
    # globals = globals |> Map.get(:first)
    reduce(rest, remaining - 1, 0, 0, k3 - 1, globals)
  end

  def reduce([head | rest], remaining, 0, k2, k3, globals) do
    globals = globals |> Map.update!(:secondSum, &(&1 + head))
    # globals = globals |> Map.get(:first)
    reduce(rest, remaining - 1, 0, k2 - 1, k3, globals)
  end

  def reduce([head | rest], remaining, 1, k2, k3, globals) do
    globals = globals |> Map.update!(:firstSum, &(&1 + head))
    globals = Map.put(globals, :firstEnd, head)
    globals = Map.put(globals, :secondStart, hd(rest))
    # globals = globals |> Map.get(:first)
    reduce(rest, remaining - 1, 0, k2 - 1, k3, globals)
  end

  def reduce([head | rest], remaining, k1, k2, k3, globals) do
    globals = globals |> Map.update!(:firstSum, &(&1 + head))
    reduce(rest, remaining - 1, k1 - 1, k2, k3, globals)
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

# n = 2 * 10 ** 4
# # n = 1000
# nums = Enum.to_list(1..n) |> Enum.map(fn _x -> Enum.random(1..(2 ** 16)) end)
# # target = Enum.random(1..1000)
# k = :rand.uniform(floor(n / 3))
# prev2 = Time.utc_now()
# IO.inspect(Solution.max_sum_of_three_subarrays(nums, k), charlists: :as_lists)
# next2 = Time.utc_now()
# diff2 = Time.diff(next2, prev2, :millisecond)
# IO.puts("Time")
# IO.puts(diff2)
