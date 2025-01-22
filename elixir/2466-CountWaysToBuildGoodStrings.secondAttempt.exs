defmodule Solution do
  @spec count_good_strings(low :: integer, high :: integer, zero :: integer, one :: integer) ::
          integer
  def count_good_strings(low, high, zero, one) do
    lower = min(zero, one)
    higher = max(zero, one)
    queue = generateQueue(:queue.new(), lower, higher, lower)
    {lowerQueue, higherQueue} = splitQueue(:queue.new(), queue, higher - lower)
    {lowerQueue, higherQueue}
    dp(lowerQueue, higherQueue, low, high, high - higher, sum)
  end

  def generateQueue(queue, 0) do
    queue
  end

  def generateQueue(queue, 1, 1, _) do
    generateQueue(:queue.in(2, queue), 0)
  end

  def generateQueue(queue, _, 1, _) do
    generateQueue(:queue.in(1, queue), 0)
  end

  def generateQueue(queue, 1, higher, resetLower) do
    generateQueue(:queue.in(1, queue), resetLower, higher - 1, resetLower)
  end

  def generateQueue(queue, lower, higher, resetLower) do
    generateQueue(:queue.in(0, queue), lower - 1, higher - 1, resetLower)
  end

  def splitQueue(_, higherQueue, 0) do
    {higherQueue, higherQueue}
  end

  def splitQueue(lowerQueue, higherQueue, 1) do
    {{_, value}, higherQueue} = :queue.out(higherQueue)
    lowerQueue = :queue.in(value, lowerQueue)
    {lowerQueue, higherQueue}
  end

  def splitQueue(lowerQueue, higherQueue, diff) do
    {{_, value}, higherQueue} = :queue.out(higherQueue)
    lowerQueue = :queue.in(value, lowerQueue)
    splitQueue(lowerQueue, higherQueue, diff - 1)
  end

  def dp(lowerQueue, higherQueue, low, high, howMuchToGenerate, sum) do
    dp(lowerQueue, higherQueue, low, high, howMuchToGenerate - 1, sum)
  end

  # sum = Integer.mod(sum + zeroValue + oneValue, 1_000_000_007)
end

low = 30
high = 30
zero = 3
one = 6
# Output: 8
IO.inspect(Solution.count_good_strings(low, high, zero, one), charlists: :as_lists)

# low = 3
# high = 3
# zero = 1
# one = 1
# # Output: 8
# IO.inspect(Solution.count_good_strings(low, high, zero, one), charlists: :as_lists)
#
# low = 2
# high = 3
# zero = 1
# one = 2
# # Output: 5
# IO.inspect(Solution.count_good_strings(low, high, zero, one), charlists: :as_lists)
#
# low = 200
# high = 200
# zero = 10
# one = 1
# # Output: 764262396
# IO.inspect(Solution.count_good_strings(low, high, zero, one), charlists: :as_lists)
