defmodule Solution do
  @spec count_good_strings(low :: integer, high :: integer, zero :: integer, one :: integer) ::
          integer
  def count_good_strings(low, high, zero, one) do
    dp(generateQueue(:queue.new(), zero), generateQueue(:queue.new(), one), low, high, 0)
  end

  def generateQueue(queue, 1) do
    :queue.in(1, queue)
  end

  def generateQueue(queue, count) do
    generateQueue(:queue.in(0, queue), count - 1)
  end

  def dp(oneQueue, zeroQueue, 1, 1, sum) do
    {{_value, zeroValue}, _zeroQueue} = :queue.out(zeroQueue)
    {{_value, oneValue}, _oneQueue} = :queue.out(oneQueue)
    sum = Integer.mod(sum + zeroValue + oneValue, 1_000_000_007)
    sum
  end

  def dp(oneQueue, zeroQueue, 1, remainingAll, sum) do
    {{_value, zeroValue}, zeroQueue} = :queue.out(zeroQueue)
    {{_value, oneValue}, oneQueue} = :queue.out(oneQueue)
    oneQueue = :queue.in(zeroValue + oneValue, oneQueue)
    zeroQueue = :queue.in(zeroValue + oneValue, zeroQueue)
    sum = Integer.mod(sum + zeroValue + oneValue, 1_000_000_007)
    dp(oneQueue, zeroQueue, 1, remainingAll - 1, sum)
  end

  def dp(oneQueue, zeroQueue, remainingToSum, remainingAll, sum) do
    {{_value, zeroValue}, zeroQueue} = :queue.out(zeroQueue)
    {{_value, oneValue}, oneQueue} = :queue.out(oneQueue)
    oneQueue = :queue.in(zeroValue + oneValue, oneQueue)
    zeroQueue = :queue.in(zeroValue + oneValue, zeroQueue)

    dp(oneQueue, zeroQueue, remainingToSum - 1, remainingAll - 1, sum)
  end
end

low = 3
high = 3
zero = 1
one = 1
# Output: 8
IO.inspect(Solution.count_good_strings(low, high, zero, one), charlists: :as_lists)

low = 2
high = 3
zero = 1
one = 2
# Output: 5
IO.inspect(Solution.count_good_strings(low, high, zero, one), charlists: :as_lists)

low = 200
high = 200
zero = 10
one = 1
# Output: 764262396
IO.inspect(Solution.count_good_strings(low, high, zero, one), charlists: :as_lists)
