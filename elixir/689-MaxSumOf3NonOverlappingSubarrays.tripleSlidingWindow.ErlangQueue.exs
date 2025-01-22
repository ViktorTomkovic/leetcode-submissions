defmodule Solution do
  @spec max_sum_of_three_subarrays(nums :: [integer], k :: integer) :: [integer]
  def max_sum_of_three_subarrays(nums, k) do
    len = length(nums)

    globals = %{
      :firstSum => 0,
      :firstQueue => :queue.new(),
      :secondSum => 0,
      :secondQueue => :queue.new(),
      :thirdSum => 0,
      :thirdQueue => :queue.new(),
      :len => len,
      :k => k,
      :singleMax => 0,
      :singleInd => [],
      :doubleMax => 0,
      :doubleInd => [],
      :tripleMax => 0,
      :tripleInd => []
    }

    reduce(nums, len, k, k, k, globals)[:tripleInd]
  end

  def reduce(_, 0, 0, 0, 0, globals) do
    globals
  end

  def reduce([head | rest], remaining, 0, 0, 0, globals) do
    # IO.inspect({remaining, [head | rest]})
    index = globals[:len] - remaining
    firstStart = index - globals[:k] * 3 + 1
    # thirdEnd = index
    secondEnd = index - globals[:k]
    firstEnd = index - globals[:k] * 2
    thirdStart = secondEnd + 1
    secondStart = firstEnd + 1
    # IO.inspect({firstStart, firstEnd, secondStart, secondEnd, thirdStart, thirdEnd})

    firstQueue = Map.get(globals, :firstQueue)
    firstSum = Map.get(globals, :firstSum)
    secondQueue = Map.get(globals, :secondQueue)
    secondSum = Map.get(globals, :secondSum)
    thirdQueue = Map.get(globals, :thirdQueue)
    thirdSum = Map.get(globals, :thirdSum)
    firstSum = firstSum - :queue.head(firstQueue) + :queue.head(secondQueue)
    # IO.inspect({firstQueue, secondQueue, thirdQueue}, charlists: :as_lists)

    firstQueue =
      firstQueue |> :queue.tail() |> then(fn q -> :queue.in(:queue.head(secondQueue), q) end)

    secondSum = secondSum - :queue.head(secondQueue) + :queue.head(thirdQueue)

    secondQueue =
      secondQueue |> :queue.tail() |> then(fn q -> :queue.in(:queue.head(thirdQueue), q) end)

    thirdSum = thirdSum - :queue.head(thirdQueue) + head
    thirdQueue = thirdQueue |> :queue.tail() |> then(&:queue.in(head, &1))

    # IO.inspect({ 0, globals }, charlists: :as_lists)
    globals =
      globals
      |> Map.put(:firstSum, firstSum)
      |> Map.put(:firstQueue, firstQueue)
      |> Map.put(:secondSum, secondSum)
      |> Map.put(:secondQueue, secondQueue)
      |> Map.put(:thirdSum, thirdSum)
      |> Map.put(:thirdQueue, thirdQueue)

    globals =
      if firstSum > Map.get(globals, :singleMax) do
        globals |> Map.put(:singleMax, firstSum) |> Map.put(:singleInd, [firstStart])
      else
        globals
      end

    globals =
      if Map.get(globals, :singleMax) + secondSum > Map.get(globals, :doubleMax) do
        globals
        |> Map.put(:doubleMax, Map.get(globals, :singleMax) + secondSum)
        |> Map.put(:doubleInd, Map.get(globals, :singleInd) ++ [secondStart])
      else
        globals
      end

    globals =
      if Map.get(globals, :doubleMax) + thirdSum > Map.get(globals, :tripleMax) do
        globals
        |> Map.put(:tripleMax, Map.get(globals, :doubleMax) + thirdSum)
        |> Map.put(:tripleInd, Map.get(globals, :doubleInd) ++ [thirdStart])
      else
        globals
      end

    # IO.inspect({ 1, globals }, charlists: :as_lists)
    reduce(rest, remaining - 1, 0, 0, 0, globals)
  end

  def reduce([head | rest], remaining, 0, 0, 1, globals) do
    # IO.inspect({remaining, [head | rest]})

    globals =
      globals
      |> Map.update!(:thirdSum, &(&1 + head))
      |> Map.update!(:thirdQueue, fn q -> :queue.in(head, q) end)

    globals =
      globals
      |> Map.put(:singleMax, Map.get(globals, :firstSum))
      |> Map.put(:singleInd, [0])
      |> Map.put(:doubleMax, Map.get(globals, :firstSum) + Map.get(globals, :secondSum))
      |> Map.put(:doubleInd, [0, Map.get(globals, :k)])
      |> Map.put(
        :tripleMax,
        Map.get(globals, :firstSum) + Map.get(globals, :secondSum) + Map.get(globals, :thirdSum)
      )
      |> Map.put(:tripleInd, [0, Map.get(globals, :k), Map.get(globals, :k) * 2])

    reduce(rest, remaining - 1, 0, 0, 0, globals)
  end

  def reduce([head | rest], remaining, 0, 0, k3, globals) do
    # IO.inspect({remaining, [head | rest]})

    globals =
      globals
      |> Map.update!(:thirdSum, &(&1 + head))
      |> Map.update!(:thirdQueue, fn q -> :queue.in(head, q) end)

    reduce(rest, remaining - 1, 0, 0, k3 - 1, globals)
  end

  def reduce([head | rest], remaining, 0, k2, k3, globals) do
    globals =
      globals
      |> Map.update!(:secondSum, &(&1 + head))
      |> Map.update!(:secondQueue, fn q -> :queue.in(head, q) end)

    reduce(rest, remaining - 1, 0, k2 - 1, k3, globals)
  end

  def reduce([head | rest], remaining, k1, k2, k3, globals) do
    # IO.inspect({remaining, [head | rest]})

    globals =
      globals
      |> Map.update!(:firstSum, &(&1 + head))
      |> Map.update!(:firstQueue, fn q -> :queue.in(head, q) end)

    reduce(rest, remaining - 1, k1 - 1, k2, k3, globals)
  end
end

# nums = [1, 2, 1, 2, 6, 7, 5, 1]
# k = 2
# # Output: [0,3,5]
# IO.inspect(Solution.max_sum_of_three_subarrays(nums, k), charlists: :as_lists)

# nums = [1, 2, 1, 2, 1, 2, 1, 2, 1]
# k = 2
# # Output: [0,2,4]
# IO.inspect(Solution.max_sum_of_three_subarrays(nums, k), charlists: :as_lists)

nums = [4,5,10,6,11,17,4,11,1,3]
k = 1
# [4,5,7]
IO.inspect(Solution.max_sum_of_three_subarrays(nums, k), charlists: :as_lists)

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
# IO.inspect(diff2)
